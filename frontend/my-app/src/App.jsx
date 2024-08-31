import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Header from "./pages/Header";
import AddHabits from "./pages/addHabits";

function App() {

  return (
    <>
         <BrowserRouter>
         <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddHabits" element={<AddHabits/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
