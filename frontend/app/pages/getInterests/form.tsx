// app/forms/Form.tsx
"use client";

import axios from "axios";
import React, { useState } from "react";

const Form = () => {
  const [userId, setUserId] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User ID:", userId);
    console.log("Interests:", interests);
    await axios
      .get(NEXT_PUBLIC_API_URL + `/users/${userId}/recommendations`)
      .then((response) => {
        if (response.status === 200) {
          setInterests(response.data.recommendations);
        }
      })
      .catch((error) => {
        console.error("Error saving interests:", error);
        alert(error?.response?.data?.error || "Error getting interests");
      });
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
