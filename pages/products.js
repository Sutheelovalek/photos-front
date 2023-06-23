import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductsPage({products}) {

    return (
        <>

        <Header />
        <div className="productsGrid">
        <h1 className="title px-[10%]">All photos</h1>
        <NewProducts products={products}/>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({},null, {sort:{'_id':-1}});

    return {
        props: {
          products: JSON.parse(JSON.stringify(products)),
        },
      };
  }