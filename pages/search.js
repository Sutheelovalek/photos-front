/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";

export default function SearchPage({ wishedProducts }) {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [debouncedSearch, phrase]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <input
          className="px-4 border m-10 text-2xl rounded-md shadow-sm"
          value={phrase}
          placeholder="Search for photos..."
          onChange={(ev) => setPhrase(ev.target.value)}
        />
        {/* Toggle section */}
        <div className="pl-14 -mt-7 text-lg">
          {products
            .filter((item) => {
              const searchTerm = phrase.toLowerCase();
              const fullName = item.title.toLowerCase()
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 5)
            .map((item) => (
              <h1
                className="cursor-pointer w-[330px]"
                key={item._id}
                onClick={() => setPhrase(item.title)}
              >
                {item.title}
              </h1>
            ))}
        </div>
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2>No photos found for query {phrase}</h2>
        )}
        {isLoading && <Spinner fullwidth={true} />}
        {!isLoading && products.length > 0 && (
          <NewProducts products={products} wishedProducts={wishedProducts} />
        )}
      </div>
    </>
  );
}
