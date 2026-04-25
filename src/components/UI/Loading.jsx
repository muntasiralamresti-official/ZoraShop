import React from "react";

const Loading = () => {
  return (
    <>
      <div className="col-span-3 flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent border-t-brand rounded-full animate-spin flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-transparent border-t-red-400 rounded-full animate-spin"></div>
          </div>

          <p className="text-secondary text-xl">Loading products...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
