import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";


export default function CategoriesPage({mainCategories, categoriesProducts}){
    return (
        <div>
            <Header />
            <div className="center">
                <h1 className="title">All Categories</h1>
                {mainCategories.map(cat => (
                <div 
                    className="mb-10" 
                    key={cat._id}>
                    <h2 className="mt-8">{cat.name}</h2>
                    <div className="category-grid">
                    {categoriesProducts[cat._id].map((product, _id) => (
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
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const categories = await Category.find();
    const mainCategories = categories.filter((c) => !c.parent);
    const categoriesProducts = {}; // catId => [products]
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
      categoriesProducts[mainCat._id] = products;
    }
    return {
      props: {
        mainCategories: JSON.parse(JSON.stringify(mainCategories)),
        categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      },
    };
  }
  