import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Aboutus from "./components/Aboutus";
import Messages from "./components/Messages";
import Gigs from "./components/Gigs";
import Community from "./components/Community";
import Profile from "./components/Profile";
import axios from "axios";
import CheckAuth from "./components/auth/ChechAuth";
import GigDescription from "./components/GigDescription";
import JobCardHeroSection from "./components/ownComponents/JobCardHeroSection";
import JobApplicants from "./components/JobApplicants";
import AppliedJobs from "./components/AppliedJobs";
import Listings from "./components/Listings";
import Conversations from "./components/Conversations";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <CheckAuth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/messages" element={<Conversations />} />
        <Route path="/messages/:receiverId" element={<Messages />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gig/:id" element={<GigDescription />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/job/:id" element={<JobCardHeroSection />} />
        <Route path="/:id/applicants" element={<JobApplicants />} />
        <Route path="/appliedJobs" element={<AppliedJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
