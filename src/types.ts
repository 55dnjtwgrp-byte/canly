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
}

export interface Pin {
  id: string;
  drinkId: string;
  storeName: string;
  city?: string;
  note?: string;
  createdAt: string;
}
