import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts })
      .then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const data = {
      name: name,
      email: email,
      city: city,
      postalCode: postalCode,
      streetAddress: streetAddress,
      country: country,
      cartProducts: cartProducts,
    };

    try {
      const response = await axios.post("/api/checkout", data);
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
      <Header />
              <div className="box flex flex-col justify-center items-center gap-4 text-2xl text-center font-bold">
                <h1>Thanks for your order!</h1>
                <h1>🙏🙏🙏🙏🙏🙏🙏🙏🙏</h1>
                <p>We will email you when your order is dispatched.</p>
              </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="flex justify-between px-[10%] py-[6%]">
        <div className="box w-full">
          <h2 className="font-bold text-2xl pb-2 text-center">Cart</h2>
          {!cartProducts?.length && (<div className="text-center text-2xl">Your cart is empty! 🤔</div>)}
          {products?.length > 0 && (
          <table className="w-full">
            <thead className="text-left text-gray-500">
              <tr>
                <th>Product</th>
                <th className="px-4">Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
            {products.map((product) => (
                      <tr 
                        className="border-t border-gray-500"
                        key={product._id}>
                        <td className="pt-2 pr-4">
                            <Image 
                              src={product.images[0]}
                              width={150}
                              height={150}
                              alt="product image"
                            /> 
                            <h3 className="text-sm">{product.title}</h3>
                        </td>
                        <td className="flex gap-2 py-[50%] items-center px-2">
                          <button 
                            onClick={() => lessOfThisProduct(product._id)}
                            className="btn-primary">-</button>
                            {cartProducts.filter((id) => id === product._id).length}
                          <button 
                            onClick={() => moreOfThisProduct(product._id)}
                            className="btn-primary">
                              +
                          </button>
                        </td>
                        <td>
                          ฿{cartProducts.filter((id) => id === product._id).length * product.price}
                        </td>
                      </tr>
                  ))}          
                  <tr className="border-t border-gray-500 font-medium">
                    <td></td>
                    <td></td>
                    <td>฿{total}</td>
                  </tr>         
            </tbody>
          </table>
          )}
        </div>
        {!!cartProducts?.length && (
          <div className="box flex flex-col gap-2 ml-[5%]">
            <h2 className="text-2xl font-bold pb-4">
              Order information
            </h2>
           
            <Input 
              value={name}
              onChange={ev => setName(ev.target.value)}
              type="text" 
              placeholder="Name"
              name="name"   
            />
            <Input 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              type="text" 
              placeholder="Email"
              name="email"   
            />
            <span className="flex gap-1">
              <Input 
                value={city}
                onChange={ev => setCity(ev.target.value)}
                type="text" 
                placeholder="City" 
                name="city" 
              />
              <Input 
                value={postalCode}
                onChange={ev => setPostalCode(ev.target.value)}
                type="text" 
                placeholder="Postal Code"
                name="postalCode"  
              />
            </span>
            <Input 
              value={streetAddress}
              onChange={ev => setStreetAddress(ev.target.value)}
              type="text" 
              placeholder="Street Address"
              name="streetAddress"  
            />
            <Input 
              value={country}
              onChange={ev => setCountry(ev.target.value)}
              type="text" 
              placeholder="Country"
              name="country" 
            />
 
            <button 
              onClick={goToPayment}
              className="btn-secondary">
              Continue to payment
            </button>
     
          </div>
        )}
      </div>
    </>
  );
}
