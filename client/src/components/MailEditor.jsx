import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Editor from "./Editor";
import { ENDPOINT } from "../App";

function MailEditor() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${ENDPOINT}/send-newsletter`, {
        subject: heading,
        body: content,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
        Swal.fire({
          title: "Success",
          text: "Newsletter sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setAlert({
          type: "error",
          message: "Error sending newsletter. Please try again.",
        });
      });
  };

  const handlePreview = () => {
    // Open preview in a new tab or window
    const previewWindow = window.open("", "_blank");

    // Construct the preview content
    const previewContent = `
      <html>
        <head>
          <title>Newsletter Preview</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; }
            h2 { font-size: 24px; font-weight: bold; }
            p { font-size: 16px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>${heading}</h2>
            <div>${content}</div>
          </div>
        </body>
      </html>
    `;

    // Write the content to the new window
    previewWindow.document.open();
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-4/5 md:w-4/6 h-4/5 md:h-4/6">
        {alert && (
          <div
            className={`alert mt-4 mb-4 ${
              alert.type === "success"
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            } border-l-4 p-4`}
            role="alert"
          >
            <p className="font-bold">
              {alert.type === "success" ? "Success" : "Error"}
            </p>
            <p>{alert.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
            type="text"
            required="true"
            placeholder="Heading...."
            value={heading}
            onChange={(ev) => setHeading(ev.target.value)}
          />

          <Editor value={content} content={setContent} />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-purple-400 block w-full rounded py-4 text-white font-bold shadow"
            >
              Send Newsletter
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="bg-blue-400 block w-full rounded py-4 text-white font-bold shadow ml-4"
            >
              Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MailEditor;
