export interface Drink {
  id: string;
  name: string;
  brand: string;
  flavor?: string;
  color: string;
}

export interface Rating {
  stars: number;
  review: string;
  updatedAt: string;
}

export interface Profile {
  displayName: string;
  bio: string;
  avatarDataUrl: string | null;
  username?: string;
}

export interface CommunityActivityEntry {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  drinkId: string;
  stars: number;
  review: string;
  updatedAt: string;
}

export interface Pin {
  id: string;
  drinkId?: string;
  customName?: string;
  isRare?: boolean;
  storeName: string;
  city?: string;
  note?: string;
  lat?: number;
  lng?: number;
  postedBy?: string;
  createdAt: string;
}
