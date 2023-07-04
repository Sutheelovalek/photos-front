import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { RevealWrapper } from "next-reveal";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

export default function ProductBox({
  product,
  _id,
  title,
  description,
  price,
  images,
  wished=false,
  onRemoveFromWishlist = () => {},
}) {
  const { addProduct } = useContext(CartContext);
  const url = "products/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  return (
    <div className="flex flex-col w-full shadow-lg pt-8 px-8 pb-4 rounded-lg">
      <RevealWrapper delay={150}>
        <Link href={url}>
          <div className="box-image">
            <button
              wished={isWished}
              onClick={addToWishlist}
              className={`btn-wishlist ${
                isWished ? "text-red-500" : "text-gray-300"
              }`}
            >
              {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
            </button>

            <Image
              width={400}
              height={250}
              src={product.images[0]}
              alt={product.title}
            />
          </div>
          <h3 className="m-0">{product.title}</h3>
        </Link>
        <div className="flex justify-between ">
          <h3 className="font-semibold text-lg">฿{product.price}</h3>
          <button
            onClick={() => addProduct(_id)}
            className="flex text-cyan-600 border border-cyan-600 px-2 rounded-md"
          >
            Add to cart
          </button>
        </div>
      </RevealWrapper>
    </div>
  );
}
