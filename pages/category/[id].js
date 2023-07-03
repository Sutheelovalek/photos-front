import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoryPage({ category, CateProducts }) {
  return (
    <>
      <Header />
      <div className="center">
        <h1 className="title capitalize">{category.name}</h1>
        <div className="category-grid">
          {CateProducts.map((product, _id) => (
            <div key={product._id}>
              <ProductBox
                product={product}
                _id={product._id}
                key={_id}
                {...product}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      CateProducts: JSON.parse(JSON.stringify(products)),
    },
  };
}
