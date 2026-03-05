import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberSearch from "./components/MemberSearch";
import MemberInsert from "./components/MemberInsert";
import MemberEdit from "./components/MemberEdit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

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