import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// This middleware verifies the session token and adds req.auth
export const requireAuth = ClerkExpressWithAuth();

// Optional: Middleware to ensure the user exists in our DB
// This assumes you have synced the user separately, or you can do lazy sync here (more expensive)
export const requireDbUser = async (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // Note: Actual DB lookup is better done in the controller or a service 
  // to avoid hitting the DB for every single static asset or route if not needed.
  // We will trust the token and let the controller handle the DB lookup.
  next();
};
