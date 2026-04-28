import React from "react";
import { Link } from "react-router";
import { useGetCategoryListQuery } from "../../Services/Api";
import { MdArrowForwardIos } from "react-icons/md";

const Category = () => {
  const { data } = useGetCategoryListQuery();

  return (
    <section className="pb-[45px]">
      <div className="container">
        <h3 className="sub_head">Category</h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 justify-between">
          {data?.map((item) => (
            <Link
              to={`/Shop?category=${item}`}
              key={item}
              className="p-4 shadow flex items-center  rounded-xl justify-between shadow-primary/70 capitalize "
            >
              <div className="flex gap-2.5 items-center justify-between">
                <p className="font-medium text-primary text-xl">{item}</p>
              </div>
              <MdArrowForwardIos className='text-primary' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
