import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);

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
    const data = {name, email, city, streetAddress, postalCode, country};
    axios.put('/api/address', data);

  }
  useEffect(() => {
        axios.get('/api/address').then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
            setCity(response.data.city);
            setPostalCode(response.data.postalCode);
            setStreetAddress(response.data.streetAddress);
            setCountry(response.data.country);
            setLoaded(true);
        });
  }, [])


  return (
    <>
      <Header />
      <div className="center">
        <div className="col-wrapper">
          <RevealWrapper delay={0}>
            <div className="box">
              <h2 className="">Wishlist</h2>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={100}>
            <div className="box flex flex-col gap-2 ml-[5%]">
                <h2 className="">Account details</h2>
                {loaded && (
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
                  Login
                </button>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </>
  );
}
