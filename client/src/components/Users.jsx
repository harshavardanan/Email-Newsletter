import React, { useState, useEffect } from "react";
import { ENDPOINT } from "../App";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/user`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${ENDPOINT}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setAlert({ type: "success", message: "Unsubscribed successfully" });
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.log(err);
      setAlert({ type: "error", message: "Error unsubscribing" });
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="container mx-auto p-4">
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
      {users.map((data) => (
        <div
          key={data.id}
          className="p-4 border-b flex flex-col md:flex-row items-center md:justify-between"
        >
          <div className="mb-2 md:mb-0 md:w-1/2">
            <p className="text-lg font-semibold">{data.name}</p>
            <p className="text-gray-600">{data.email}</p>
          </div>
          <div className="flex md:w-1/2 md:justify-end">
            <button
              onClick={(e) => deleteData(data.id)}
              className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
