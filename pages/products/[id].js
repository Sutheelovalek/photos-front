import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Image from "next/image";
import { useContext } from "react";



export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext)
    return (
        <>
        <Header />
        <div className="flex justify-evenly items-center mt-20 px-[10%] gap-10">
            <div className="max-w-full border p-1 bg-gray-100 rounded-sm shadow-lg w-1/3">
                <Image 
                    src={product.images?.[0]}
                    width={1000}
                    height={1000}
                    alt="product image"
                />
            </div>
            <div className="flex flex-col gap-2 w-2/3">
                <h1 className="font-bold text-3xl text-gray-900">{product.title}</h1>
                <p className="text-xl mb-4">{product.description}</p>
                <div className="flex gap-4">
                    <h3 className="flex items-center text-4xl font-semibold text-gray-800">฿{product.price}</h3>
                    <button 
                        onClick={() => addProduct(product._id)}
                    className="btn-secondary flex justify-center items-center w-[150px] gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Add to cart
                    </button>

                </div>
            </div>

        </div>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }

}