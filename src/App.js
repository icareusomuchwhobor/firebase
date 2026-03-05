import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberSearch from "./components/MemberSearch";
import MemberInsert from "./components/MemberInsert";
import MemberEdit from "./components/MemberEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberSearch />} />
        <Route path="/insert" element={<MemberInsert />} />
        <Route path="/edit" element={<MemberEdit />} />
      </Routes>
    </Router>
  );
}

export default App;