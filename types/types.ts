// App-specific user interface with cached Clerk data
export interface AppUser {
  clerkId: string; // Primary key linking to Clerk
  firstName: string; // Cached from Clerk
  lastName?: string; // Cached from Clerk (optional)
  email: string; // Cached from Clerk
  thumbnailUrl?: string; // App-specific data
  points: number; // App-specific data
  isLeagueManager: boolean; // App-specific permission flag
  lastSyncedAt: Date; // For cache invalidation
}

// Legacy user type for backward compatibility
export type FitMatchUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  isBot: boolean;
};

// Database user types (inferred from schema)
export type User = {
  id: string; // Clerk user ID (clerkId)
  firstName: string; // Cached from Clerk
  lastName: string | null; // Cached from Clerk (optional)
  email: string; // Cached from Clerk
  thumbnailUrl: string | null; // App-specific data
  points: number; // App-specific data
  isLeagueManager: boolean; // App-specific permission flag
  lastSyncedAt: Date; // For cache invalidation
  createdAt: Date;
  updatedAt: Date;
};

export type InsertUser = Omit<User, "createdAt" | "updatedAt">;
export type UpdateUser = Omit<Partial<User>, "id"> & Pick<User, "id">;

export type ApiErrorResponse = {
  message: string;
};

export type ButtonVariant = "primary" | "secondary" | "destructive" | "default";
export type TextVariant = "primary" | "secondary" | "default";
