import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({product}) {
  return (
    <div>
      <Header />
      <Featured 
        product={product}
      />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '647b09b0d90cf6fca606d21a';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: {product: JSON.parse(JSON.stringify(product))},
  }
}