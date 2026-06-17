import React from "react";
import { IoStar } from "react-icons/io5";
import { CiStar } from "react-icons/ci";

const Reviews = ({ reviews = [] }) => {
  const formatReviewDate = (dateValue) => {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString();
  };

  return (
    <section className="pb-10">
      <div className="container pl-0 space-y-8">
        {reviews.map((review, index) => (
          <div
            key={
              review.id ??
              `${review.reviewerEmail ?? review.reviewerName ?? "review"}-${review.date ?? index}`
            }
          >
            <div className="flex">
              <div className="w-14 h-14 rounded-full border-2 border-primary bg-brand/20 bg-secondary-200 flex items-center justify-center text-xl font-bold text-secondary-600">
                {review.reviewerName?.charAt(0)}
              </div>

              <div className="pl-4">
                <h4 className="text-primary font-medium text-lg">
                  {review.reviewerName}
                </h4>

                <div className="flex items-center gap-4 mt-1">
                  <span className="text-secondary text-lg font-medium">
                    {review.rating}.0
                  </span>

                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <IoStar key={i} />
                      ) : (
                        <CiStar key={i} className="text-secondary-300" />
                      ),
                    )}
                  </div>

                  <span className="text-secondary/80 text-lg">
                    {formatReviewDate(review.date)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-secondary/80 mt-6 text-lg">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
