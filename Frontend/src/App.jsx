import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import EntryPage from "./pages/EntryPage";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";

// Layout component with Header
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public page without header */}
            <Route path="/" element={<EntryPage />} />

            {/* Pages with Header */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
