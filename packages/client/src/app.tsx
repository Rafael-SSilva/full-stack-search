import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import HotelDetail from "./pages/Hotel"
import CityDetails from "./pages/City"
import CountryDetails from "./pages/Country"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/cities/:id" element={<CityDetails />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App