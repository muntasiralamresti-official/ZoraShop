import React from "react";
import { IoStar } from "react-icons/io5";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Vanille",
      rating: 5,
      time: "1 Month Ago",
      image: "/rev-1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Maduin",
      rating: 5,
      time: "1 Month Ago",
      image: "/rev-2.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Samantha",
      rating: 5,
      time: "1 Month Ago",
      image: "/rev-3.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      name: "Roveria",
      rating: 5,
      time: "1 Month Ago",
      image: "/rev-4.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className=" pb-10">
      <div className="container pl-0 space-y-8">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="flex">
              {/* Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 object-cover"
              />

              {/* Content */}
              <div className="pl-4">
                <h4 className="text-primary font-medium text-lg">
                  {review.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-secondary text-lg font-medium">
                    5.0
                  </span>

                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <IoStar key={i} />
                    ))}
                  </div>

                  <span className="text-secondary/80 text-lg">
                    {review.time}
                  </span>
                </div>

                {/* Text */}
              </div>
            </div>
            <p className="text-secondary/80 mt-6 text-lg">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
