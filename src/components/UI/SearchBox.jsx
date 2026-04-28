import React, { useState, useEffect, useRef } from "react";
import { IoSearch, IoClose, IoTrendingUpOutline } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import {
  useLazySearchProductQuery,
  useGetProductsQuery,
} from "../../Services/Api";
import ProductCard from "./ProductCard";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const [triggerSearch, { data: searchData, isFetching }] =
    useLazySearchProductQuery();

  const { data: featuredData } = useGetProductsQuery({
    limit: 6,
    skip: 0,
  });

  useEffect(() => {
    if (debouncedQuery) {
      triggerSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const isSearchMode = debouncedQuery.length > 0;

  const products = isSearchMode
    ? searchData?.products?.slice(0, 6) || []
    : featuredData?.products?.slice(0, 6) || [];

  const relatedCategories = isSearchMode
    ? [...new Set(searchData?.products?.map((p) => p.category))].slice(0, 6)
    : [];

  const trendingSearch = [...(featuredData?.products || [])]
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)
    .map((p) => p.title);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/*  Search Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[#F1F1F1] rounded-md w-full"
      >
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search product..."
          className="flex-1 bg-transparent outline-none border-none px-5 py-3 text-lg"
        />

        {query ? (
          <Button
            type="button"
            onClick={handleClear}
            className="px-2 py-4 text-lg"
          >
            <IoClose />
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-brand text-white text-lg px-5 py-4"
          >
            <IoSearch />
          </Button>
        )}
      </form>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1200px] z-50 bg-white rounded-2xl shadow-2xl border border-[#EFEEEE] overflow-hidden">
          <div className="flex min-h-[400px]">
            {/* LEFT */}
            <div className="w-[260px] p-4  shrink-0">
              {isSearchMode ? (
                <>
                  <p className="text-lg font-semibold mb-3 flex items-center gap-1">
                    <FiTag /> Categories
                  </p>

                  {relatedCategories.length > 0 ? (
                    relatedCategories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/?category=${cat}`}
                        onClick={() => setOpen(false)}
                        className="block py-1 text-lg hover:text-brand"
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="text-lg text-secondary/80">No categories</p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold mb-3 flex items-center gap-1">
                    <IoTrendingUpOutline /> Trending
                  </p>

                  {trendingSearch.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(item)}
                      className="block text-left w-full py-1 text-lg hover:text-brand"
                    >
                      {item}
                    </button>
                  ))}
                </>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex-1 p-4 max-h-[600px] overflow-y-auto">
              <p className="text-lg mb-3">
                {isSearchMode
                  ? `Results for "${debouncedQuery}"`
                  : "Trending Products"}
              </p>

              {isFetching ? (
                <p className="text-center text-secondary/80">
                  <Loading />
                </p>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                  {products.map((item) => (
                    <Link
                      key={item.id}
                      to={`/shop/${item.id}`}
                      onClick={() => setOpen(false)}
                    >
                      <ProductCard
                        head={item.title}
                        img={item.thumbnail}
                        price={item.price}
                        discount={item.discountPercentage}
                        rating={item.rating}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-secondary/80">
                  No products found 
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
