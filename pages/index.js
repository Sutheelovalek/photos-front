import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
     <Header />
     <Featured product={featuredProduct}/>
      <h1 className="text-3xl px-[10%] mt-10 font-bold text-gray-800">
          High-Quality Stock Images
      </h1>
     <NewProducts products={newProducts}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featureProductId = '648d677fa1d455ba315bc0c6';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featureProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10});
  return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      },
    };
}


