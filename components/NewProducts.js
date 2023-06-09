import ProductBox from "./ProductBox";

export default function NewProducts({ products, wishedProducts = [] }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-4 px-[10%] pt-6">
        {products.length > 0 &&
          products.map((product) => (
            <ProductBox
              product={product}
              _id={product._id}
              key={product._id}
              wished={wishedProducts.includes(product._id)}
            />
          ))}
      </div>
    </div>
  );
}
