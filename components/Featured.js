/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({product}) {
    const {addProduct} =  useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(product._id);
    }
    return (
        <div className="px-[8%] bg-gray-600 grid grid-cols-2 gap-10">
            <div>
                <h1 className="text-2xl text-white pt-[10%]">{product.title}</h1>
                <p className="text-sm text-gray-200 py-4 pb-4">
                    {product.description}
                </p>
                <div className="flex gap-1">
                    <Link href={'/products/' + product._id}>
                    <button 
                    className="btn-primary"> 
                        Read more
                    </button>    
                    </Link>
                    <button 
                        onClick={addFeaturedToCart}
                        className="btn-secondary inline-flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Add to cart
                    </button>
                </div>
            </div>
            <div className="max-w-full py-[10%]">
                <Image 
                width={500}
                height={500}
                src={product.images[0]}
                alt="hill image"/>
            </div>
        </div>
    );
}