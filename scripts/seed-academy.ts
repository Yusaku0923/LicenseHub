
import { PrismaClient } from '@prisma/client'

// Prismaクライアントのインスタンス化
const prisma = new PrismaClient()

// シードデータの定義
// 登録販売者試験のためのコースデータ
const COURSE_DATA = {
  code: 'tohan',
  name: '登録販売者試験',
  description: '登録販売者試験の合格を目指すための総合コース',
  chapters: [
    {
      number: 1,
      title: '医薬品に共通する特性と基本的な知識',
      summary: '医薬品の本質やリスク、薬害の歴史など、登録販売者として知っておくべき基礎知識を学びます。',
      sections: [
        {
          number: 1,
          title: '医薬品概論',
          slug: 'tohan-c1-s1',
          topics: [
            { code: 'tohan-c1-s1-t1', name: '医薬品の本質', importance: 5 },
            { code: 'tohan-c1-s1-t2', name: 'リスク評価', importance: 4 },
            { code: 'tohan-c1-s1-t3', name: '健康食品', importance: 3 },
          ]
        },
        {
          number: 2,
          title: '医薬品の効き目や安全性に影響を与える要因',
          slug: 'tohan-c1-s2',
          topics: [
            { code: 'tohan-c1-s2-t1', name: '副作用', importance: 5 },
            { code: 'tohan-c1-s2-t2', name: '不適正な使用と相互作用', importance: 4 },
            { code: 'tohan-c1-s2-t3', name: '小児・高齢者等への配慮', importance: 4 },
          ]
        },
        {
          number: 3,
          title: '適切な医薬品購入と受診勧奨',
          slug: 'tohan-c1-s3',
          topics: [
            { code: 'tohan-c1-s3-t1', name: 'セルフメディケーション', importance: 3 },
            { code: 'tohan-c1-s3-t2', name: '販売時のコミュニケーション', importance: 4 },
          ]
        },
        {
          number: 4,
          title: '薬害の歴史',
          slug: 'tohan-c1-s4',
          topics: [
            { code: 'tohan-c1-s4-t1', name: '主要な薬害訴訟', importance: 5 },
          ]
        }
      ]
    },
    {
      number: 2,
      title: '人体の働きと医薬品',
      summary: '人体の構造や機能、薬が体内でどのように働くか（薬物動態）、副作用の症状などを学びます。',
      sections: [
        {
          number: 1,
          title: '人体の構造と働き',
          slug: 'tohan-c2-s1',
          topics: [
            { code: 'tohan-c2-s1-t1', name: '消化器系', importance: 5 },
            { code: 'tohan-c2-s1-t2', name: '呼吸器系', importance: 4 },
            { code: 'tohan-c2-s1-t3', name: '循環器系', importance: 4 },
          ]
        },
        {
          number: 2,
          title: '薬が働く仕組み',
          slug: 'tohan-c2-s2',
          topics: [
            { code: 'tohan-c2-s2-t1', name: '薬の吸収・代謝・排泄', importance: 5 },
            { code: 'tohan-c2-s2-t2', name: '剤形と特徴', importance: 3 },
          ]
        },
        {
          number: 3,
          title: '症状からみた主な副作用',
          slug: 'tohan-c2-s3',
          topics: [
            { code: 'tohan-c2-s3-t1', name: '全身的に現れる副作用', importance: 5 },
            { code: 'tohan-c2-s3-t2', name: '精神神経系に現れる副作用', importance: 4 },
          ]
        }
      ]
    },
    {
      number: 3,
      title: '主な医薬品とその作用',
      summary: '風邪薬から漢方薬まで、主要な医薬品の効能・効果、成分、注意点について詳しく学びます。',
      sections: [
        {
          number: 1,
          title: '精神神経に作用する薬',
          slug: 'tohan-c3-s1',
          topics: [
            { code: 'tohan-c3-s1-t1', name: 'かぜ薬', importance: 5 },
            { code: 'tohan-c3-s1-t2', name: '解熱鎮痛薬', importance: 5 },
            { code: 'tohan-c3-s1-t3', name: '眠気を促す薬・防ぐ薬', importance: 3 },
          ]
        },
        {
          number: 2,
          title: '呼吸器官に作用する薬',
          slug: 'tohan-c3-s2',
          topics: [
            { code: 'tohan-c3-s2-t1', name: '鎮咳去痰薬', importance: 4 },
          ]
        },
        {
          number: 3,
          title: '胃腸に作用する薬',
          slug: 'tohan-c3-s3',
          topics: [
            { code: 'tohan-c3-s3-t1', name: '胃腸薬', importance: 4 },
            { code: 'tohan-c3-s3-t2', name: '瀉下薬（便秘薬）', importance: 3 },
          ]
        }
      ]
    },
    {
      number: 4,
      title: '薬事関係法規・制度',
      summary: '医薬品医療機器等法（薬機法）を中心に、医薬品の販売や管理に関する法律・制度を学びます。',
      sections: [
        {
          number: 1,
          title: '医薬品販売業の許可',
          slug: 'tohan-c4-s1',
          topics: [
            { code: 'tohan-c4-s1-t1', name: '許可の種類', importance: 5 },
            { code: 'tohan-c4-s1-t2', name: '店舗販売業', importance: 5 },
          ]
        },
        {
          number: 2,
          title: '医薬品の分類と取扱い',
          slug: 'tohan-c4-s2',
          topics: [
            { code: 'tohan-c4-s2-t1', name: 'リスク区分', importance: 5 },
            { code: 'tohan-c4-s2-t2', name: '容器・外箱への記載事項', importance: 4 },
          ]
        }
      ]
    },
    {
      number: 5,
      title: '医薬品の適正使用・安全対策',
      summary: '添付文書の読み方や副作用報告制度など、安全情報の活用と各種制度への貢献について学びます。',
      sections: [
        {
          number: 1,
          title: '医薬品の適正使用情報',
          slug: 'tohan-c5-s1',
          topics: [
            { code: 'tohan-c5-s1-t1', name: '添付文書', importance: 5 },
            { code: 'tohan-c5-s1-t2', name: '製品表示の確認', importance: 3 },
          ]
        },
        {
          number: 2,
          title: '医薬品の安全対策',
          slug: 'tohan-c5-s2',
          topics: [
            { code: 'tohan-c5-s2-t1', name: '副作用被害救済制度', importance: 5 },
          ]
        }
      ]
    },
  ]
}

async function main() {
  console.log('シードデータの投入を開始します...')

  // 1. コースの作成または更新
  const course = await prisma.course.upsert({
    where: { code: COURSE_DATA.code },
    update: {
      name: COURSE_DATA.name,
      description: COURSE_DATA.description
    },
    create: {
      code: COURSE_DATA.code,
      name: COURSE_DATA.name,
      description: COURSE_DATA.description,
      isActive: true
    }
  })

  console.log(`コースが更新されました: ${course.name} (id: ${course.id})`)

  // 2. チャプター（章）の処理
  for (const chData of COURSE_DATA.chapters) {
    // 既存のチャプターをコースIDとチャプター番号で検索
    let chapter = await prisma.chapter.findFirst({
      where: {
        courseId: course.id,
        chapterNumber: chData.number
      }
    })

    if (chapter) {
      chapter = await prisma.chapter.update({
        where: { id: chapter.id },
        data: {
          title: chData.title,
          summary: chData.summary,
          displayOrder: chData.number
        }
      })
    } else {
      chapter = await prisma.chapter.create({
        data: {
          courseId: course.id,
          chapterNumber: chData.number,
          title: chData.title,
          summary: chData.summary,
          displayOrder: chData.number
        }
      })
    }
    console.log(`  チャプター ${chData.number} が更新されました: ${chapter.title}`)

    // 3. セクション（節）の処理
    for (const secData of chData.sections) {
      // 既存のセクションをチャプターIDとセクション番号で検索
      let section = await prisma.section.findFirst({
        where: {
          chapterId: chapter.id,
          sectionNumber: secData.number
        }
      })

      if (section) {
        section = await prisma.section.update({
          where: { id: section.id },
          data: {
            title: secData.title,
            slug: secData.slug,
            displayOrder: secData.number
          }
        })
      } else {
        section = await prisma.section.create({
          data: {
            chapterId: chapter.id,
            sectionNumber: secData.number,
            title: secData.title,
            slug: secData.slug,
            displayOrder: secData.number
          }
        })
      }
      console.log(`    セクション ${secData.number} が更新されました: ${section.title}`)

      // 4. トピック（単元）の処理
      for (const topicData of secData.topics) {
        // トピックをセクションIDとコードで検索
        let topic = await prisma.topic.findFirst({
          where: {
            sectionId: section.id,
            code: topicData.code
          }
        })

        if (topic) {
          topic = await prisma.topic.update({
            where: { id: topic.id },
            data: {
              name: topicData.name,
              importanceGlobal: topicData.importance
            }
          })
        } else {
          topic = await prisma.topic.create({
            data: {
              sectionId: section.id,
              code: topicData.code,
              name: topicData.name,
              importanceGlobal: topicData.importance
            }
          })
        }
        console.log(`      トピックが更新されました: ${topic.name}`)
      }
    }
  }

  console.log('シードデータの投入が完了しました。')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
