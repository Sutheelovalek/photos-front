
import Image from "next/image";
import ProductBox from "./ProductBox";

export default function NewProducts ({products}) {
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl px-[10%] mt-10 font-medium text-gray-800">High-Quality Stock Images</h1>
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