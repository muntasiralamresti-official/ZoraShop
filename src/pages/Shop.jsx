import React, { useState } from "react";
import ProductCard from "../components/UI/ProductCard";
import Select from "../components/UI/Select";
import { Link, useSearchParams } from "react-router";
import { FaChevronDown } from "react-icons/fa";
import { useGetCategoryListQuery, useGetProductsQuery } from "../Services/Api";
import Error from "../components/UI/Error";
import Loading from "../components/UI/Loading";
import { Pagination } from "../components/UI/Pagination";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [limit, setLimit] = useState(20);
  const [pagination, setPagination] = useState({
    category: null,
    page: 1,
  });
  const pagenumber = pagination.category === category ? pagination.page : 1;

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip: limit * (pagenumber - 1),
    category,
  });

  const { data: categories } = useGetCategoryListQuery();

  const totalProducts = data?.total ?? 0;
  const totalPage = Math.max(1, Math.ceil(totalProducts / limit));
  const startItem = totalProducts === 0 ? 0 : limit * (pagenumber - 1) + 1;
  const endItem = totalProducts === 0 ? 0 : Math.min(limit * pagenumber, totalProducts);

  const formatCategoryLabel = (value) => value.replaceAll("-", " ");

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

  return (
    <main className="py-13">
      <div className="container grid grid-cols-12 gap-12">
        {/* SideBar */}
        <div className="col-span-3 bg-white py-6 px-5 h-fit sticky top-0 left-0 hidden lg:block">
          <div className="pb-6 my-6 border-b-2 border-b-secondary/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg  font-medium text-primary">
                Filter by Price
              </h3>
              <FaChevronDown className="text-lg font-medium text-primary cursor-pointer" />
            </div>
            <input type="range" name="" id="" className="w-full my-6 " />
            <p>Price: $0 - $20000 </p>
          </div>

          <h3 className="text-lg font-medium text-primary">
            Related Categories
          </h3>
          <div className="space-y-1.5">
            {categories?.map((item) => (
              <Link
                to={`/shop?category=${encodeURIComponent(item)}`}
                key={item}
                className="block text-base text-secondary capitalize"
              >
                {formatCategoryLabel(item)}
              </Link>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <p className="text-medium text-secondary/50">
              {" "}
              Showing{" "}
              <span className="text-primary text-lg">{startItem} - {endItem}</span>{" "}
              of <span className="text-primary text-lg"> {totalProducts} </span>{" "}
              products
            </p>
            <div className="flex items-center gap-3 w-fit">
              <p className="text-base text-secondary/50 whitespace-nowrap">
                Sort By:
              </p>
              <Select
                className="max-w-44"
                options={Sortoption}
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPagination({ category, page: 1 });
                }}
              />
            </div>
          </div>

          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-screen">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div className="col-span-3 flex justify-center items-center">
                <Error />
              </div>
            ) : data?.products?.length === 0 ? (
              <p className="col-span-full text-center text-secondary">
                No products found for this category.
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

          <Pagination
            handleChange={(num) => setPagination({ category, page: num })}
            pageNumber={pagenumber}
            totalPage={totalPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Shop;
