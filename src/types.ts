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
