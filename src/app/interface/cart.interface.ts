export interface Cart {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  total: string;
}

export interface CartProducts {
  data: Cart[],
  msg: string,
  status: boolean
}

export interface AddProduct {
  productId?: number,
  quantity?: number
}
