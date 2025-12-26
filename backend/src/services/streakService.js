import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ---------------- Date Helpers ---------------- */

function toUtcMidnight(date = new Date()) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function getYesterdayUtc() {
  const d = toUtcMidnight();
  d.setUTCDate(d.getUTCDate() - 1);
  return d;
}

/* ---------------- Core Logic ---------------- */

async function logActivity(userId) {
  const today = toUtcMidnight();
  const yesterday = getYesterdayUtc();

  // Upsert daily activity
  await prisma.userActivity.upsert({
    where: {
      userId_date: { userId, date: today },
    },
    update: {
      count: { increment: 1 },
    },
    create: {
      userId,
      date: today,
      count: 1,
    },
  });

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Same-day activity: streak unchanged
  if (
    user.lastActivityAt &&
    user.lastActivityAt.getTime() === today.getTime()
  ) {
    return {
      streak: user.currentStreak,
      status: "count_incremented",
    };
  }

  let newStreak = 1;

  // Continue streak if yesterday was active
  if (
    user.lastActivityAt &&
    user.lastActivityAt.getTime() === yesterday.getTime()
  ) {
    newStreak = user.currentStreak + 1;
  }

  await prisma.users.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastActivityAt: today,
    },
  });

  return {
    streak: newStreak,
    status: "streak_updated",
  };
}

async function getHeatmap(userId) {
  const activities = await prisma.userActivity.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  const heatmap = {};

  for (const activity of activities) {
    const key = activity.date.toISOString().slice(0, 10);
    heatmap[key] = activity.count;
  }

  return heatmap;
}

export { logActivity, getHeatmap };
