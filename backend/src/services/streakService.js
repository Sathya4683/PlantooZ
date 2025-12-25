// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const getToday = () => {
//   const date = new Date();
//   date.setHours(0, 0, 0, 0);
//   return date;
// };

// const getYesterday = () => {
//   const date = new Date();
//   date.setDate(date.getDate() - 1);
//   date.setHours(0, 0, 0, 0);
//   return date;
// };

// const logActivity = async (userId) => {
//   const today = getToday();
//   const yesterday = getYesterday();

//   await prisma.userActivity.upsert({
//     where: {
//       userId_date: { userId, date: today },
//     },
//     update: {
//       count: { increment: 1 },
//     },
//     create: {
//       userId,
//       date: today,
//       count: 1,
//     },
//   });

//   const user = await prisma.users.findUnique({ where: { id: userId } });

//   if (user.lastActivity && user.lastActivity.getTime() === today.getTime()) {
//     return { streak: user.currentStreak, status: "updated_count" };
//   }

//   let newStreak = 1;
//   if (user.lastActivity && user.lastActivity.getTime() === yesterday.getTime()) {
//     newStreak = user.currentStreak + 1;
//   }

//   await prisma.users.update({
//     where: { id: userId },
//     data: {
//       currentStreak: newStreak,
//       longestStreak: Math.max(newStreak, user.longestStreak),
//       lastActivity: today,
//     },
//   });

//   return { streak: newStreak, status: "streak_updated" };
// };

// const getHeatmap = async (userId) => {
//   const activities = await prisma.userActivity.findMany({
//     where: { userId },
//     orderBy: { date: "asc" },
//   });

//   const heatmapData = activities.reduce((acc, curr) => {
//     const dateKey = curr.date.toISOString().split("T")[0];
//     acc[dateKey] = curr.count;
//     return acc;
//   }, {});

//   return heatmapData;
// };

// module.exports = { logActivity, getHeatmap };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* ---------------- Date Utilities ---------------- */

/**
 * Returns a Date normalized to UTC midnight (YYYY-MM-DDT00:00:00Z)
 */
function toUtcMidnight(date = new Date()) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * Returns yesterday at UTC midnight
 */
function getYesterdayUtc() {
  const d = toUtcMidnight();
  d.setUTCDate(d.getUTCDate() - 1);
  return d;
}

/* ---------------- Core Logic ---------------- */

/**
 * Logs user activity for today.
 * - One row per user per day (upsert)
 * - Correctly updates streaks
 * - Idempotent for multiple calls per day
 */
async function logActivity(userId) {
  const today = toUtcMidnight();
  const yesterday = getYesterdayUtc();

  // Upsert daily activity
  await prisma.userActivity.upsert({
    where: {
      userId_date: {
        userId,
        date: today,
      },
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

  // If already logged today, streak does not change
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

/**
 * Returns heatmap data for the user
 * Shape: { "YYYY-MM-DD": count }
 *
 * Backend responsibility:
 * - raw daily aggregation only
 * - no grid logic (frontend owns layout)
 */
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

module.exports = {
  logActivity,
  getHeatmap,
};
