import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { RevealWrapper } from "next-reveal";

export default function ProductBox({product, _id}) {
    const {addProduct} = useContext(CartContext);
    const url = 'products/'+_id; 
    return (
        <div className="flex flex-col w-full shadow-lg p-2 rounded-lg">
            <RevealWrapper delay={150}>
            <Link
            href={url}
            >
            <Image 
                width={1000}
                height={400}
                src={product.images[0]}
                alt={product.title}
            />
                <h3 className="m-0">{product.title}</h3>
            </Link>
            <div className="flex justify-between ">
                <h3 className="font-semibold text-lg">
                    ฿{product.price}
                </h3>
                <button 
                    onClick={() => addProduct(_id)}
                    className="flex text-cyan-600 border border-cyan-600 px-2 rounded-md">Add to cart</button>
            </div>

            </RevealWrapper>
        </div>
    )
}