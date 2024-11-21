// app/forms/Form.tsx
"use client";

import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [userId, setUserId] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User ID:", userId);
    console.log("Interests:", interests);
    await axios
      .post(NEXT_PUBLIC_API_URL + "/recommendations", {
        user_id: userId,
        preferences: interests,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Interests saved successfully");
        } else {
          alert("Error saving interests");
        }
      })
      .catch((error) => {
        console.error("Error saving interests:", error);
        alert("Error saving interests");
      });
  };

  // Add new interest to the list
  const handleAddInterest = () => {
    if (newInterest) {
      setInterests((prevInterests) => [...prevInterests, newInterest]);
      setNewInterest("");
    }
  };

  // Remove an interest
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((item) => item !== interest));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="flex flex-row items-center">
        <label htmlFor="userId" className="font-medium text-gray-700 w-64">
          User ID:
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex flex-row">
          <h3 className="font-medium text-lg w-64 text-gray-700">Interests:</h3>
          <div className="flex flex-col">
            <ul className="space-y-2 mt-2">
              {interests.map((interest, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 border border-gray-300 rounded-lg"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-white p-1 rounded-lg transition"
                  >
                    <svg
                      className="w-6 h-6 text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-3 items-center mt-2">
              <input
                type="text"
                id="interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
