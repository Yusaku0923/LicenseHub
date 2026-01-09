
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // 1. Ensure a user exists
  const user = await prisma.user.upsert({
    where: { email: 'nakayama@example.com' },
    update: {},
    create: {
      email: 'nakayama@example.com',
      passwordHash: 'dummy_hash',
      profile: {
        create: {
          displayName: 'Nakayama',
          dailyStudyMinutes: 60,
          targetExamRegionId: 1, // Mock ID
          targetExamYearId: 1, // Mock ID
        }
      }
    },
  })

  // 2. Create Today's Daily Plan
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  
  // Clean up existing plan for today to avoid duplicates during dev
  // Note: in production we might check existence instead
  const existingPlan = await prisma.userDailyPlan.findUnique({
    where: {
      userId_planDate: {
        userId: user.id,
        planDate: today
      }
    }
  })

  let planId
  if (existingPlan) {
    console.log(`Plan for ${todayStr} already exists.`)
    planId = existingPlan.id
  } else {
    // Create new plan
    const plan = await prisma.userDailyPlan.create({
      data: {
        userId: user.id,
        planDate: today,
        estimatedMinutes: 25,
        status: 'planned',
        items: {
          create: [
            // Step 1: Lecture
            {
              itemType: 'lecture',
              status: 'planned',
              targetCount: 1,
              completedCount: 0,
              // We would link to actual Chapter/Topic here if seeded
              // For now, these are placeholder values or assume IDs exist
            },
            // Step 2: Practice
            {
              itemType: 'practice',
              status: 'planned',
              targetCount: 5,
              completedCount: 0,
            },
            // Step 3: Flashcard
            {
              itemType: 'flashcard',
              status: 'planned',
              targetCount: 10,
              completedCount: 0,
            }
          ]
        }
      }
    })
    planId = plan.id
    console.log(`Created plan: ${plan.id}`)
  }

  // 3. Create AI Feedback
  const feedback = await prisma.aiDailyFeedback.upsert({
    where: {
      userId_date: {
        userId: user.id,
        date: today
      }
    },
    update: {},
    create: {
      userId: user.id,
      date: today,
      summaryText: 'Nakayamaさん、こんにちは！昨日の『胃腸薬』は正答率80%で絶好調でした☀️ 今日はこの調子でStep 1へ進みましょう！',
      modelName: 'gpt-4o'
    }
  })

  console.log('✅ Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
