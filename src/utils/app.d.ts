type Product = {
  id: number;
  img: string;
  name: string;
  price: number;
  colour: string;
  quantity?: number;
};

type ProductItemProps = {
  product: Product;
};

type ProductListProps = {
  products: Product[];
  colorFilter: string;
  handleColorFilterChange: (selectedColor: string) => void;
};

type ProductQuantity = {
  [productId: number]: number;
};

type FilterProps = {
  onColorFilterChange: (selectedColor: string) => void;
  products: Product[];
};

type ProductsSlice = {
  products: Product[];
};

type CartSlice = {
  items: Product[];
};
