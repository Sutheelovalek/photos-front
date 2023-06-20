
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header() {
    const {cartProducts} = useContext(CartContext)
    return (
        <header className="bg-gray-800 text-white flex justify-between px-[8%] pt-4">
            <Link 
                className="flex"
                href={'/'}>
                    <Image 
                    className="-mt-5"
                    alt="Landscape picture"
                    width={70}
                    height={60}
                    src='/images/logo/LogoU.png'/> 
                    STOCK FOOTO
            </Link>
            <nav className="flex gap-4">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>All products</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link>
                <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
            </nav>
        </header>
    )
}