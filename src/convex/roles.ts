import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

/**
 * Attach one of the four product profiles to the signed-in user.
 * Called after first sign-in (email OTP or anonymous demo) so the app knows
 * which dashboard the account belongs to.
 */
export const setProfileRole = mutation({
  args: {
    profileRole: v.union(
      v.literal("student"),
      v.literal("industry"),
      v.literal("academician"),
      v.literal("institutionAdmin"),
    ),
  },
  handler: async (ctx, { profileRole }) => {
    const user = await getCurrentUser(ctx);
    if (user === null) {
      throw new Error("Not signed in");
    }
    await ctx.db.patch(user._id, { profileRole });
    return { profileRole };
  },
});
