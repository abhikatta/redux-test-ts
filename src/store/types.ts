interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartProduct extends Product {
  quantity: number;
}

interface User {
  email: string | null;
  password: string | null;
  setPassword?: string | null;
}

export type { CartProduct, Product, User };
