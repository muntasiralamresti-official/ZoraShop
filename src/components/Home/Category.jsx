import React from "react";
import { Link } from "react-router";
import { useGetCategoryListQuery } from "../../Services/Api";
import { MdArrowForwardIos } from "react-icons/md";

const Category = () => {
  const { data = [], isLoading, isError } = useGetCategoryListQuery();

  const formatCategoryLabel = (category) =>
    category.replaceAll("-", " ");

  return (
    <section className="pb-[45px]">
      <div className="container">
        <h3 className="sub_head">Category</h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 justify-between">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[76px] rounded-xl bg-primary/5 animate-pulse"
              />
            ))}

          {isError && (
            <p className="col-span-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Categories could not be loaded right now.
            </p>
          )}

          {!isLoading &&
            !isError &&
            data.map((item) => (
              <Link
                to={`/shop?category=${encodeURIComponent(item)}`}
                key={item}
                className="p-4 shadow flex items-center rounded-xl justify-between shadow-primary/30 capitalize"
              >
                <div className="flex gap-2.5 items-center justify-between">
                  <p className="font-medium text-primary text-xl">
                    {formatCategoryLabel(item)}
                  </p>
                </div>
                <MdArrowForwardIos className="text-primary" />
              </Link>
            ))}

          {!isLoading && !isError && data.length === 0 && (
            <p className="col-span-full rounded-xl border border-primary/10 px-4 py-3 text-sm text-secondary">
              No categories are available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;
