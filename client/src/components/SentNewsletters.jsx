import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINT } from "../App";

const SentNewsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [alert, setAlert] = useState(null);

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/sent-newsletters`);
      setNewsletters(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNewsletter = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "It will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#944dff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${ENDPOINT}/sent-newsletters/${id}`);
        setNewsletters(newsletters.filter((news) => news.id !== id));
        Swal.fire("Deleted!", "Newsletter deleted successfully.", "success");
      } catch (err) {
        Swal.fire(
          "Error!",
          "There was an error deleting the newsletter.",
          "error"
        );
        console.log(err);
      }
    }
  };

  function formatDateAgo(created_at) {
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);

    const timeDifference = currentDate - createdAtDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    } else if (days === 1) {
      return `1 day ago`;
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (hours === 1) {
      return `1 hour ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return `just now`;
    }
  }

  const previewNewsletter = (subject, body) => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Preview</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <h1>${subject}</h1>
            <div>${body}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this website.");
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const getSnippet = (html, wordLimit) => {
    const text = html.replace(/<[^>]+>/g, ""); // Strip HTML tags
    const words = text.split(" ").slice(0, wordLimit).join(" ");
    return words + (text.length > wordLimit ? "..." : "");
  };

  return (
    <div className="container mx-auto p-4 ">
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
      {newsletters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {newsletters.map((news) => (
            <div key={news.id} className="flex flex-col mt-6 ">
              <div className="relative shadow-md bg-purple-100 rounded-xl overflow-hidden w-80 h-70 md:w-96 md:h-60">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <h5 className="block mb-2 font-sans text-xl font-semibold text-blue-gray-900 truncate">
                      {getSnippet(news.subject, 8)}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-gray-700 overflow-hidden">
                      {getSnippet(news.body, 20)}
                    </p>
                  </div>
                  <div className="flex justify-end mt-0">
                    <button
                      onClick={() => previewNewsletter(news.subject, news.body)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 ml-2"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => deleteNewsletter(news.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="absolute bottom-0 left-0 p-4 text-gray-500 text-xs">
                  {formatDateAgo(news.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No newsletters found.</p>
      )}
    </div>
  );
};

export default SentNewsletters;
