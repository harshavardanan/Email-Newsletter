import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import TextEditor from "./components/TextEditor";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import SentNewsletters from "./components/SentNewsletters";
import MailEditor from "./components/MailEditor";

export const ENDPOINT = "http://localhost:";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<AddUser />} />
          <Route path="/mynewsletters" element={<SentNewsletters />} />
          <Route path="/texteditor" element={<MailEditor />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
