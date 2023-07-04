import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

import { mongooseConnect } from "@/lib/mongoose";

export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  wishedProducts = [],
}) {
  return (
    <div>
      <Header />
      <div className="center">
        <h1 className="title">All Categories</h1>
        {mainCategories.map((cat) => (
          <div className="mb-4" key={cat._id}>
            <div className="flex items-center mt-8 mb-3 gap-5">
              <h2 className="capitalize">{cat.name}</h2>
              <Link
                className="text-xl text-gray-500 underline pt-2"
                href={"/category/" + cat._id}
              >
                Show all
              </Link>
            </div>
            <div className="category-grid">
              {categoriesProducts[cat._id].map((product, _id) => (
                <div key={product._id}>
                  <ProductBox
                    wished={wishedProducts.includes(product._id)}
                    product={product}
                    _id={product._id}
                    key={_id}
                    {...product}
                  />
                </div>
              ))}
              <Link
                className="bg-[#ddd] h-[180px] text-xl text-gray-800 border rounded-lg flex items-center justify-center"
                href={"/category/" + cat._id}
              >
                Show all &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(conText) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find(
      { category: { $in: categoriesIds } },
      null,
      { limit: 3, sort: { _id: -1 } }
    );
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(conText.req, conText.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFetchedProductsId,
      })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((item) => item.product.toString()),
    },
  };
}
