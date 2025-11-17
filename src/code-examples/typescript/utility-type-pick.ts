interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// type ProductSummary = { id: number; name: string; }
type ProductSummary = Pick<Product, "id" | "name">;

const displaySummary: ProductSummary = {
  id: 101,
  name: "Laptop",
};
