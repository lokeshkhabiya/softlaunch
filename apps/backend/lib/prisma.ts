// Re-export everything from shared db package
// The prisma client and all types are handled by @softlaunch/db
export { prisma } from "@softlaunch/db";

// For types, import from @softlaunch/db which re-exports from its generated client
// Note: These need to be imported where used since @softlaunch/db may not export them
// If you need enums, import them directly: import { MessageRole } from "@prisma/client"
