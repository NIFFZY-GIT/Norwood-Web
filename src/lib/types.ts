// src/lib/types.ts
export interface Item {
  _id: string; // Always a string after fetching/creation
  name: string;
  description: string;
  itemCode: string;
  imageBase64: string; // Assumed mandatory for an item
  userId: string;
  createdAt: Date; // Will be a Date object
  
}

export interface UserSession {
  userId: string;
  username: string;
  // any other session fields
}

export interface User {
  _id: string; // from MongoDB
  username: string;
  email?: string; // Assuming email is stored
  createdAt: Date;
  // Do NOT store passwords directly here for listing.
  // Add role or isAdmin if you store it on the user document
  isAdmin?: boolean;
}

