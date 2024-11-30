import React, { useState } from "react";
import { ENDPOINT } from "../App";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ENDPOINT}/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      console.log(data);
      setAlert({ type: "success", message: "Subscribed successfully!" });
      setName("");
      setEmail("");
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message: "Failed to subscribe. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Subscribe to our Newsletter
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
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            placeholder="Enter Fullname"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="someone@example.com"
            autoComplete="off"
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
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default AddUser;
