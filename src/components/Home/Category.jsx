import React from "react";
import { Link } from "react-router";
import { useGetCategoryListQuery } from "../../Services/Api";

const Category = () => {
  const { data } = useGetCategoryListQuery();

  return (
    <section className="pb-[45px]">
      <div className="container">
        <h3 className="sub_head">Category</h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {data?.map((item) => (
            <Link
              to={`/Shop?category=${item}`}
              key={item}
              className="p-4 shadow flex items-center  rounded-xl justify-center bg-brand/25 capitalize "
            >
              <div className="flex gap-2.5 items-center">
                <p className="font-medium text-primary text-xl">{item}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
