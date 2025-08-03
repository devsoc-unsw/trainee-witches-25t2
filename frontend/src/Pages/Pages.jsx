import {
  Routes,
  Route,
} from "react-router-dom";

const Pages = () => {
  return (
    <div>
      {/* This is how the routing/page links work */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Pages;