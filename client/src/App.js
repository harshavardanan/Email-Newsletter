import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import TextEditor from "./components/TextEditor";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import SentNewsletters from "./components/SentNewsletters";
import MailEditor from "./components/MailEditor";
import Unsubscribe from './components/Unsubscribe'

export const ENDPOINT = "http://localhost:5000";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {" "}
        {/* pt-16 adjusts for the navbar height */}
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/new" element={<TextEditor />} />
          <Route path="/" element={<AddUser />} />
          <Route path="/mynewsletters" element={<SentNewsletters />} />
          <Route path="/texteditor" element={<MailEditor />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
