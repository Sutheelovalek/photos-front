import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import SingleOrder from "@/components/SingleOrder";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishListLoaded, setWishListLoaded] = useState(true);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishListLoaded(false);
    setOrdersLoaded(false);
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishListLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setOrdersLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }
  

  return (
    <>
      <Header />
      <div className="center">
        <div className="col-wrapper">
          <RevealWrapper delay={0}>
            <div className="bg-gray-100 p-10 rounded-lg">
              <Tabs
                tabs={["Orders", "Wishlist"]}
                active={activeTab}
                onChange={setActiveTab}
              />
              {activeTab === "Orders" && (
                <>
                  {!ordersLoaded && <Spinner fullWidth={true} />}
                  {ordersLoaded && (
                    <div>
                      {orders.length > 0 &&
                        orders.map((order, index) => (
                          <SingleOrder {...order} index={index} key={index} />
                        ))}
                    </div>
                  )}
                </>
              )}
              {activeTab === "Wishlist" && (
                <>
                  {wishListLoaded && (
                    <div className="grid gap-10">
                      {wishedProducts.length > 0 &&
                        wishedProducts.map((wp) => (
                          <ProductBox
                            onRemoveFromWishlist={productRemovedFromWishlist}
                            product={wp}
                            key={wp._id}
                            wished={true}
                            {...wp}
                          />
                        ))}
                      {wishedProducts.length === 0 && (
                        <>
                          {session && (
                            <p className="py-4">Your wishlist is empty</p>
                          )}
                          {!session && (
                            <p className="py-4">
                              Login to add product to your wishlist{" "}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <div className="bg-gray-100 p-10 rounded-lg flex flex-col gap-2 ml-[5%]">
              <h2 className="pb-2">{session ? "Account details" : "Login"}</h2>
              {addressLoaded && session && (
                <>
                  <Input
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                  <Input
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    type="text"
                    placeholder="Email"
                    name="email"
                  />
                  <span className="flex gap-1">
                    <Input
                      value={city}
                      onChange={(ev) => setCity(ev.target.value)}
                      type="text"
                      placeholder="City"
                      name="city"
                    />
                    <Input
                      value={postalCode}
                      onChange={(ev) => setPostalCode(ev.target.value)}
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode"
                    />
                  </span>
                  <Input
                    value={streetAddress}
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                    type="text"
                    placeholder="Street Address"
                    name="streetAddress"
                  />
                  <Input
                    value={country}
                    onChange={(ev) => setCountry(ev.target.value)}
                    type="text"
                    placeholder="Country"
                    name="country"
                  />

                  <button onClick={saveAddress} className="btn-secondary mt-4">
                    Save
                  </button>
                </>
              )}

              <hr className="border border-gray-200" />
              {session && (
                <button onClick={logout} className="btn-primary">
                  Logout
                </button>
              )}
              {!session && (
                <button onClick={login} className="btn-secondary">
                  Login with Google
                </button>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </>
  );
}
