export interface Product {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
}

export interface Products {
  data:Product[];
  msg: string;
  status: true;
}

export interface ProductDetails {
  data: Product;
  msg: string;
  status: true;
}