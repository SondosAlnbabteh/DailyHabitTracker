import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Header from "./pages/Header";
function App() {

  return (
    <>
         <BrowserRouter>
         <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
    
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
