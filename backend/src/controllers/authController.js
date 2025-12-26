import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const syncUser = async (req, res) => {
  try {
    const { userId, sessionClaims } = req.auth;
    const email = sessionClaims?.email || sessionClaims?.primaryEmail; // Adjust based on Clerk claims

    if (!userId) {
      return res.status(400).json({ error: "No user ID found in token" });
    }

    // Upsert user: Create if not exists, update if exists (optional, maybe update email)
    // Note: sessionClaims might not always have email depending on config.
    // For now, we assume the client sends email or we rely on just ID if email is missing.
    // Better: Client sends email in body if we want to be sure, or we trust Clerk's token claims.
    
    // Let's try to find first
    let user = await prisma.users.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
       // We need an email. If it's not in the token, we might fail or generate a dummy one?
       // Clerk tokens usually contain the email if scope is requested.
       // Fallback: req.body.email
       const userEmail = req.body.email || `user_${userId}@example.com`;
       
       user = await prisma.users.create({
         data: {
           clerkId: userId,
           email: userEmail,
           name: req.body.name || "New Planter",
         }
       });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Sync user error:", error);
    return res.status(500).json({ error: "Failed to sync user" });
  }
};
