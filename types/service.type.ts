export interface Category {
  id: string;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string | null;
  location: string;
  availability: boolean;
  category: Category;
  provider: Provider;
}