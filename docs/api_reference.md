# LicenseHub Academy API Reference

## 概要

本APIはイベント駆動アーキテクチャを採用しています。クライアントはユーザーの操作やシステムの状態変化を表す「イベント」をAPIに送信し、APIはそのイベントに応じた処理（データベース更新、外部サービス連携など）を行います。

- **Base URL**: `http://localhost:8081` (開発環境)
- **Content-Type**: `application/json`
- **Authorization**: `Bearer <token>` (JWT)
  - 開発環境では `.env` に `SKIP_AUTH=true` を設定することで認証をバイパス可能です。

### 共通レスポンス形式

全てのイベントAPIは以下の形式でレスポンスを返します。

**成功時 (200 OK)**
```json
{
  "success": true,
  "eventType": "EVENT_NAME",
  "data": { ... },     // イベント固有の処理結果
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

**エラー時 (400 Bad Request / 401 Unauthorized / 403 Forbidden / 500 Internal Server Error)**
```json
{
  "success": false,
  "error": "エラー概要",
  "details": "詳細なエラーメッセージまたはバリデーションエラー",
  "eventType": "EVENT_NAME"
}
```

---

## 認証 (Auth)

### 開発用トークン発行
開発環境でのテスト用にJWTトークンを発行します。

- **Endpoint**: `POST /auth/token`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "userId": 1,
    "email": "test@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1Ni...",
    "userId": 1,
    "email": "test@example.com"
  }
  ```

---

## 1. ユーザー (User)

### ユーザー登録 (USER_REGISTERED)
新規ユーザーを作成します。

- **Endpoint**: `POST /events/user-registered`
- **Auth**: Public (Gateway経由を想定)
- **Request Body**:
  ```json
  {
    "eventType": "USER_REGISTERED",
    "actorUserId": "system", 
    "payload": {
      "authProviderId": "auth0|123456",
      "email": "user@example.com",
      "displayName": "User Name"
    }
  }
  ```

### プロフィール更新 (USER_PROFILE_UPDATED)
ユーザーのプロフィール情報（志望地域、年度など）を更新します。

- **Endpoint**: `POST /events/user-profile-updated`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "USER_PROFILE_UPDATED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "targetExamRegionId": 1,
      "targetExamYearId": 1,
      "displayName": "Updated Name"
    }
  }
  ```

### メールアドレス確認 (USER_EMAIL_VERIFIED)
メールアドレスの確認が完了したことを記録します。

- **Endpoint**: `POST /events/user-email-verified`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "USER_EMAIL_VERIFIED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "email": "verified@example.com"
    }
  }
  ```

### ログイン記録 (USER_LOGGED_IN)
ユーザーのログイン日時を更新します。

- **Endpoint**: `POST /events/user-logged-in`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "USER_LOGGED_IN",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "loginMethod": "email"
    }
  }
  ```

### パスワードリセット要求 (PASSWORD_RESET_REQUESTED)
パスワードリセットトークンを発行します。

- **Endpoint**: `POST /events/password-reset-requested`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "PASSWORD_RESET_REQUESTED",
    "actorUserId": "system",
    "payload": {
      "email": "user@example.com"
    }
  }
  ```

### パスワードリセット完了 (PASSWORD_RESET_COMPLETED)
新しいパスワードを設定し、トークンを無効化します。

- **Endpoint**: `POST /events/password-reset-completed`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "PASSWORD_RESET_COMPLETED",
    "actorUserId": "system",
    "payload": {
      "token": "reset-token-string",
      "newPasswordHash": "hashed-password"
    }
  }
  ```

---

## 2. 演習 (Practice)

### 演習セッション開始 (PRACTICE_SESSION_STARTED)
新しい演習セッションを開始します。

- **Endpoint**: `POST /events/practice-session-started`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "PRACTICE_SESSION_STARTED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "sessionType": "daily_task", // daily_task, chapter, weakness, random, region, past_set
      "targetExamRegionId": 1,     // optional
      "targetChapterId": 1         // optional
    }
  }
  ```

### 解答提出 (PRACTICE_ANSWER_SUBMITTED)
1問ごとの解答を記録し、習熟度スコアを更新します。

- **Endpoint**: `POST /events/practice-answer-submitted`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "PRACTICE_ANSWER_SUBMITTED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "sessionId": 1,
      "questionId": 100,
      "selectedChoiceId": 301,
      "isCorrect": true,
      "timeTakenSeconds": 45
    }
  }
  ```

### 演習セッション終了 (PRACTICE_SESSION_ENDED)
セッションを終了し、集計結果を保存します。

- **Endpoint**: `POST /events/practice-session-ended`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "PRACTICE_SESSION_ENDED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "sessionId": 1,
      "endedAt": "2026-01-06T12:00:00Z"
    }
  }
  ```

---

## 3. フラッシュカード (Flashcard)

### 復習記録 (FLASHCARD_REVIEWED)
フラッシュカードの復習結果を記録し、次回の復習日を計算します(SRS)。

- **Endpoint**: `POST /events/flashcard-reviewed`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "FLASHCARD_REVIEWED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "flashcardId": 50,
      "rating": 3 // 1=Again, 2=Hard, 3=Good, 4=Easy
    }
  }
  ```

---

## 4. 学習計画 (Daily Plan)

### 今日の学習プラン生成 (DAILY_PLAN_GENERATED)
指定日の学習プラン（タスクリスト）を生成します。

- **Endpoint**: `POST /events/daily-plan-generated`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_PLAN_GENERATED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "date": "2026-01-06",
      "targetDate": "2026-10-18" // 試験日
    }
  }
  ```

### 学習アイテム開始 (DAILY_PLAN_ITEM_STARTED)
プラン内の個別のタスクを開始状態にします。

- **Endpoint**: `POST /events/daily-plan-item-started`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_PLAN_ITEM_STARTED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "planItemId": 10
    }
  }
  ```

### 学習アイテム進捗更新 (DAILY_PLAN_ITEM_PROGRESS)
タスクの進捗（完了数など）を更新します。

- **Endpoint**: `POST /events/daily-plan-item-progress`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_PLAN_ITEM_PROGRESS",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "planItemId": 10,
      "completedCount": 5
    }
  }
  ```

### 学習アイテム完了 (DAILY_PLAN_ITEM_COMPLETED)
タスクを完了状態にします。

- **Endpoint**: `POST /events/daily-plan-item-completed`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_PLAN_ITEM_COMPLETED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "planItemId": 10,
      "completedAt": "2026-01-06T15:30:00Z"
    }
  }
  ```

### デイリープラン完了 (DAILY_PLAN_COMPLETED)
1日の全タスク完了または手動完了時に呼び出されます。

- **Endpoint**: `POST /events/daily-plan-completed`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_PLAN_COMPLETED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "dailyPlanId": 5
    }
  }
  ```

### 日次サマリー更新 (DAILY_SUMMARY_UPDATED)
1日の学習時間や完了タスク数を集計して更新します。

- **Endpoint**: `POST /events/daily-summary-updated`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "DAILY_SUMMARY_UPDATED",
    "actorUserId": "1",
    "payload": {
      "userId": 1,
      "date": "2026-01-06",
      "studyMinutesToAdd": 30,
      "questionsAnsweredToAdd": 10
    }
  }
  ```

### AIフィードバック生成 (AI_FEEDBACK_GENERATED)
学習実績に基づくAIアドバイスを保存します。

- **Endpoint**: `POST /events/ai-feedback-generated`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "eventType": "AI_FEEDBACK_GENERATED",
    "actorUserId": "system",
    "payload": {
      "userId": 1,
      "date": "2026-01-06",
      "feedbackContent": "今日はよく頑張りました！..."
    }
  }
  ```

---

## 5. 課金 (Subscription / Stripe)

### Stripe Webhook受信 (STRIPE_EVENT_RECEIVED)
StripeからのWebhookを受け取ります。

- **Endpoint**: `POST /events/stripe-event-received`
- **Auth**: Public (署名検証はGatewayまたはアプリ内で実施)
- **Request Body**:
  ```json
  {
    "eventType": "STRIPE_EVENT_RECEIVED",
    "actorUserId": "system",
    "payload": {
      "stripeEventId": "evt_12345",
      "stripeEventType": "invoice.payment_succeeded",
      "data": { ... }
    }
  }
  ```

### サブスクリプション作成 (SUBSCRIPTION_CREATED)
- **Endpoint**: `POST /events/subscription-created`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "SUBSCRIPTION_CREATED",
    "actorUserId": "system",
    "payload": {
      "userId": 1,
      "stripeSubscriptionId": "sub_123",
      "planCode": "standard",
      "status": "active"
    }
  }
  ```

### サブスクリプション更新 (SUBSCRIPTION_UPDATED)
- **Endpoint**: `POST /events/subscription-updated`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "SUBSCRIPTION_UPDATED",
    "actorUserId": "system",
    "payload": {
      "userId": 1,
      "stripeSubscriptionId": "sub_123",
      "status": "past_due"
    }
  }
  ```

### 支払い失敗 (PAYMENT_FAILED)
- **Endpoint**: `POST /events/payment-failed`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "PAYMENT_FAILED",
    "actorUserId": "system",
    "payload": {
      "userId": 1,
      "amount": 1000,
      "reason": "insufficient_funds"
    }
  }
  ```

### サブスクリプションキャンセル (SUBSCRIPTION_CANCELED)
- **Endpoint**: `POST /events/subscription-canceled`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "eventType": "SUBSCRIPTION_CANCELED",
    "actorUserId": "system",
    "payload": {
      "userId": 1,
      "stripeSubscriptionId": "sub_123",
      "canceledAt": "2026-02-01T00:00:00Z"
    }
  }
  ```
