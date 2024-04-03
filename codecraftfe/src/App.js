import "./index.css";
import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import CssBaseline, { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "./Components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Explanation from "./pages/Explanation";

import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Converter from "./pages/Converter";
import Optimization from "./pages/Optimization";
import Commenter from "./pages/Commenter";
import Tools from "./pages/Tools";
import Refactor from "./pages/Refactor";
import BugFixer from "./pages/BugFix";
function App() {
  const theme = useMemo(() => createTheme(themeSettings()));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/code" element={<Converter />} />
          <Route path="/explanation" element={<Explanation />} />
          <Route path="/optimization" element={<Optimization />} />
          <Route path="/commenter" element={<Commenter />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/refactor" element={<Refactor />} />
          <Route path="/bugfix" element={<BugFixer />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
