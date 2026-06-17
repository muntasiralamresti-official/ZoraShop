import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import Reviews from "../UI/Reviews";
import Input from "../UI/Input";
import { CiStar } from "react-icons/ci";

const getStoredReviews = (storageKey) => {
  try {
    const storedReviews = localStorage.getItem(storageKey);
    return storedReviews ? JSON.parse(storedReviews) : [];
  } catch {
    return [];
  }
};

const Testimonials = ({ reviews = [], productId = "global" }) => {
  const formRef = useRef(null);
  const storageKey = `shopora-reviews-${productId}`;

  const [savedReviews, setSavedReviews] = useState(() =>
    getStoredReviews(storageKey),
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 5,
  });
  const [errors, setErrors] = useState({});

  const allReviews = [...savedReviews, ...reviews].sort(
    (firstReview, secondReview) =>
      new Date(secondReview.date) - new Date(firstReview.date),
  );

  const averageRating = allReviews.length
    ? (
        allReviews.reduce((total, review) => total + Number(review.rating || 0), 0) /
        allReviews.length
      ).toFixed(1)
    : "0.0";

  const handleInputChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));

    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.comment.trim()) {
      nextErrors.comment = "Please write a short review.";
    } else if (formData.comment.trim().length < 10) {
      nextErrors.comment = "Your review should be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newReview = {
      id: Date.now(),
      reviewerName: formData.name.trim(),
      reviewerEmail: formData.email.trim(),
      comment: formData.comment.trim(),
      rating: formData.rating,
      date: new Date().toISOString(),
    };

    const nextSavedReviews = [newReview, ...savedReviews];
    setSavedReviews(nextSavedReviews);

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextSavedReviews));
    } catch {
      // Ignore storage errors so the UI remains usable even in strict browsers.
    }

    setFormData({
      name: "",
      email: "",
      comment: "",
      rating: 5,
    });
    setErrors({});
    setSubmitMessage("Thanks. Your review has been added.");
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderAverageStars = () => {
    const numericRating = Number(averageRating);

    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;

      if (numericRating >= starNumber) {
        return <FaStar key={starNumber} />;
      }

      if (numericRating >= starNumber - 0.5) {
        return <FaStarHalfStroke key={starNumber} />;
      }

      return <CiStar key={starNumber} className="text-secondary-300" />;
    });
  };

  return (
    <section className="bg-white my-8">
      <div className="container">
        {/* Rating */}
        <div className="flex flex-col gap-5 py-9 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl text-primary font-medium mb-5">
              Customer Reviews
            </h3>

            <div className="flex items-center gap-1 text-yellow-400">
              {renderAverageStars()}
              <span className="text-secondary">
                {allReviews.length
                  ? `${averageRating} out of 5 based on ${allReviews.length} review${allReviews.length > 1 ? "s" : ""}`
                  : "No reviews yet"}
              </span>
            </div>
          </div>

          <Button onClick={scrollToForm}>Write a Review</Button>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-2xl text-primary font-medium pb-7">
            Reviews <span>({allReviews.length})</span>
          </h3>

          {allReviews.length > 0 ? (
            <Reviews reviews={allReviews} />
          ) : (
            <div className="rounded-2xl border border-dashed border-secondary/20 px-6 py-10 text-center text-secondary">
              No one has reviewed this product yet. Be the first to share your experience.
            </div>
          )}
        </div>

        {/* Add Review */}
        <div ref={formRef}>
          <h3 className="text-2xl font-semibold text-primary">
            Add Your Review
          </h3>

          <p className="text-lg text-secondary/70 pt-4 pb-7">
            Share your experience with this product
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-[745px] rounded-2xl border border-secondary/10 p-6 md:p-8"
          >
            <div className="pb-8">
              <h4 className="text-lg pb-4">Name *</h4>
              <Input
                value={formData.name}
                onChange={(event) =>
                  handleInputChange("name", event.target.value)
                }
                error={errors.name}
                className="border-2 h-15"
                placeholder="Your name"
              />
            </div>

            <div className="pb-8">
              <h4 className="text-lg pb-4">Email *</h4>
              <Input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                error={errors.email}
                className="border-2 h-15"
                placeholder="you@example.com"
              />
            </div>

            <div className="pb-8">
              <h4 className="text-lg pb-4">Review *</h4>
              <textarea
                value={formData.comment}
                onChange={(event) =>
                  handleInputChange("comment", event.target.value)
                }
                rows={5}
                placeholder="Tell other shoppers what stood out for you."
                className={`w-full rounded-lg border-2 px-3 py-3 outline-none transition focus:ring-2 focus:ring-brand ${
                  errors.comment ? "border-red-500" : "border-secondary-300"
                }`}
              />
              {errors.comment && (
                <p className="mt-1 text-lg text-red-500">{errors.comment}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center">
              <h4 className="text-lg font-medium">Rating</h4>
              <div className="flex items-center gap-1 text-2xl">
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1;
                  const isActive = starValue <= formData.rating;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleInputChange("rating", starValue)}
                      className={`cursor-pointer transition ${
                        isActive ? "text-yellow-400" : "text-secondary-300"
                      }`}
                      aria-label={`Set rating to ${starValue} star${starValue > 1 ? "s" : ""}`}
                    >
                      {isActive ? <FaStar /> : <CiStar />}
                    </button>
                  );
                })}
              </div>
              <span className="text-secondary">{formData.rating}/5</span>
            </div>

            {submitMessage && (
              <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-green-700">
                {submitMessage}
              </p>
            )}

            <Button type="submit" className="px-14 py-4 mt-8">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
