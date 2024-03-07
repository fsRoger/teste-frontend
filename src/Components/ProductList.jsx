import ProductDetail from "./ProductDetail";

function ProductList(products) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <ProductDetail products={products.products} />
    </div>
  );
}

export default ProductList;