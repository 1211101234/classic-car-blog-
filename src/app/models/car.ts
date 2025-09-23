export type CarCategory = 'JDM' | 'Euro' | 'American'

export interface Car {
  id: number;
  name: string;
  image: string;
  description: string;
  year: number;
  origin: string;
  horsepower?: number;
  engine?: string;
  top_speed?: number;
}
