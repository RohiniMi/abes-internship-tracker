import React from 'react'
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
import Support from "./Components/Support.jsx";
import Footer from "./Components/Footer.jsx";
import "./App.css";
const App = () => {
  return (
    <div id="root">
      <Header/>
      <Main/>
      <Support/>
      <Footer/>
    </div>
  )
}

export default App