
import ProductBox from "./ProductBox";

export default function NewProducts ({products}) {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 px-[10%] pt-6">
                {products.length > 0 && products.map((product, _id) => (
                    <ProductBox
                        product={product}
                        _id={product._id}
                        key={_id}
                    />
                ))}
            </div>
        </div>
    )
}