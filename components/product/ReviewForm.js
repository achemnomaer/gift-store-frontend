"use client";

import { backend_secret_key } from "@/lib/constant";
import axios from "axios";
import { useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ReviewForm = ({ productSlug }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1); // Changed initial rating to 1
  const [comment, setComment] = useState("");

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating === rating ? 1 : selectedRating); // Toggle the rating
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${backendUrl}/api/submit-review/${productSlug}/`,
        {
          name,
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Secret-Key": backend_secret_key,
          },
        }
      );

      // Reset form fields after successful submission
      setName("");
      setRating(1);
      setComment("");
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(i)}
          className={`text-3xl ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          } focus:outline-none`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-md pt-8">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Write a Review
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

          {/* Name input field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Rating rendered as star icon */}
          <div className="mb-4 flex">
            <label className="block text-gray-700 text-sm font-bold  mr-4 my-auto">
              Rating
            </label>
            <div className="flex items-center my-auto">{renderStars()}</div>
          </div>

          {/* Comment input field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Review"
              rows="4"
              required
            />
          </div>

          {/* Submit and Cancel button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
