import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <div className="productsGrid">
        <h1 className="title px-[10%]">All photos</h1>
        <NewProducts products={products} wishedProducts={wishedProducts} />
      </div>
    </>
  );
}

export async function getServerSideProps(conText) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(conText.req, conText.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((item) => item.product.toString()),
    },
  };
}
