import React, { useState } from "react";
import ProductCard from "../components/UI/ProductCard";
import Select from "../components/UI/Select";
import { Link, useSearchParams } from "react-router";
import { FaChevronDown, FaFilter, FaTimes } from "react-icons/fa";
import { useGetCategoryListQuery, useGetProductsQuery } from "../Services/Api";
import Error from "../components/UI/Error";
import Loading from "../components/UI/Loading";
import { Pagination } from "../components/UI/Pagination";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search =
    searchParams.get("q")?.trim() || searchParams.get("search")?.trim() || "";

  const [limit, setLimit] = useState(20);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const filterKey = `${category ?? ""}:${search}:${limit}`;
  const [pagination, setPagination] = useState(() => ({
    filterKey,
    pageNumber: 1,
  }));
  const pageNumber =
    pagination.filterKey === filterKey ? pagination.pageNumber : 1;

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip: limit * (pageNumber - 1),
    category,
    search,
  });

  const { data: categories } = useGetCategoryListQuery();

  const totalProducts = data?.total ?? 0;
  const totalPage = Math.max(1, Math.ceil(totalProducts / limit));
  const startItem = totalProducts === 0 ? 0 : limit * (pageNumber - 1) + 1;
  const endItem =
    totalProducts === 0 ? 0 : Math.min(limit * pageNumber, totalProducts);

  const formatCategoryLabel = (value) => value.replaceAll("-", " ");
  const activeFilterLabel = search
    ? `Search results for "${search}"`
    : category
      ? `Category: ${formatCategoryLabel(category)}`
      : "All products";
  const emptyStateMessage = search
    ? `No products found for "${search}".`
    : category
      ? `No products found for ${formatCategoryLabel(category)}.`
      : "No products found.";

  const Sortoption = [
    {
      value: "20",
      label: "20",
    },
    {
      value: "40",
      label: "40",
    },
    {
      value: "60",
      label: "60",
    },
  ];

  const FilterPanel = (
    <>
      <div className="pb-6 mb-6 border-b-2 border-b-secondary/10">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-medium text-primary">
            Filter by Price
          </h3>
          <FaChevronDown className="text-lg font-medium text-primary cursor-pointer" />
        </div>
        <input type="range" name="" id="" className="w-full my-6" />
        <p className="text-sm sm:text-base">Price: $0 - $20000</p>
      </div>

      <h3 className="text-base sm:text-lg font-medium text-primary">
        Related Categories
      </h3>
      <div className="space-y-1.5 mt-3">
        {categories?.map((item) => (
          <Link
            to={`/shop?category=${encodeURIComponent(item)}`}
            key={item}
            onClick={() => setShowMobileFilters(false)}
            className="block text-sm sm:text-base text-secondary capitalize"
          >
            {formatCategoryLabel(item)}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <main className="py-8 sm:py-10 lg:py-13">
      <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 text-sm font-medium text-primary border border-secondary/20 rounded-md px-4 py-2"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Mobile filter drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-xs bg-white px-5 py-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-primary">Filters</h3>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close filters"
                  className="text-secondary text-xl"
                >
                  <FaTimes />
                </button>
              </div>
              {FilterPanel}
            </div>
          </div>
        )}

        {/* SideBar (desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-white py-6 px-5 h-fit sticky top-4">
          {FilterPanel}
        </div>

        {/* Card */}
        <div className="col-span-1 lg:col-span-9">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-sm sm:text-medium text-secondary/50">
                Showing{" "}
                <span className="text-primary text-base sm:text-lg">
                  {startItem} - {endItem}
                </span>{" "}
                of{" "}
                <span className="text-primary text-base sm:text-lg">
                  {totalProducts}
                </span>{" "}
                products
              </p>
              <p className="pt-1 text-xs sm:text-sm text-secondary">
                {activeFilterLabel}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-fit">
              <p className="text-sm sm:text-base text-secondary/50 whitespace-nowrap">
                Sort By:
              </p>
              <Select
                className="w-full sm:max-w-44"
                options={Sortoption}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="pt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="col-span-full flex justify-center items-center">
                <Error />
              </div>
            ) : data?.products?.length === 0 ? (
              <p className="col-span-full text-center text-secondary">
                {emptyStateMessage}
              </p>
            ) : (
              data?.products?.map((item) => (
                <Link to={`/shop/${item.id}`} key={item.id}>
                  <ProductCard
                    id={item.id}
                    head={item.title}
                    img={item.thumbnail}
                    price={item.price}
                    discount={item.discountPercentage}
                    rating={item.rating}
                  />
                </Link>
              ))
            )}
          </div>

          {totalProducts > 0 && (
            <Pagination
              handleChange={(nextPage) =>
                setPagination({ filterKey, pageNumber: nextPage })
              }
              pageNumber={pageNumber}
              totalPage={totalPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;