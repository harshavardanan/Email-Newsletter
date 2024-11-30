import React, { useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../App";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const deleteData = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.delete(`${ENDPOINT}/user/${email}`);
      console.log(response);
      setAlert({
        type: "success",
        message: "You have been unsubscribed successfully.",
      });
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message: "There was an error unsubscribing. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={deleteData}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            We are sorry to see you go!
          </h2>
          {alert && (
            <div
              className={`alert ${
                alert.type === "success"
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-red-100 border-red-500 text-red-700"
              } border-l-4 p-4 mb-4`}
              role="alert"
            >
              <p className="font-bold">
                {alert.type === "success" ? "Success" : "Error"}
              </p>
              <p>{alert.message}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              placeholder="someone@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Unsubscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Unsubscribe;
