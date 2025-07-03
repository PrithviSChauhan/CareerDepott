import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToLogin = () => navigate("/login");
  const goToSignUp = () => navigate("/signup");
  const goToProfile = () => navigate("/profile");
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: "Home", to: "/" },
    user?.role === "recruiter"
      ? { label: "Post Job", to: "/gigs" }
      : { label: "Gigs", to: "/gigs" },
    user?.role === "recruiter"
      ? { label: "Listings", to: "/listings" }
      : { label: "Applied Jobs", to: "/appliedJobs" },
    { label: "Messages", to: "/messages" },
    { label: "Contact us (me)", to: "/aboutus" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5] shadow">
      <div className="flex justify-between items-center w-full h-16 px-4 md:px-10">
        <h1 className="text-2xl font-bold">CareerDepott</h1>

        <div className="md:hidden text-2xl">
          <button onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {user && (
          <ul className="hidden md:flex items-center gap-4 text-sm md:text-base">
            {navLinks.map((link) => (
              <li
                key={link.to}
                className="px-4 py-2 border border-transparent hover:border-[#50b8e7] rounded-2xl cursor-pointer"
              >
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Button variant="outline" onClick={goToLogin}>
                Log in
              </Button>
              <Button
                variant="outline"
                onClick={goToSignUp}
                className="bg-blue-500 text-white hover:bg-blue-900"
              >
                Sign up
              </Button>
            </>
          ) : (
            <button onClick={goToProfile}>
              <img
                src={user.profile.profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden px-4 py-4 flex flex-col gap-3 bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5] shadow-md">
          {user &&
            navLinks.map((link) => (
              <li
                key={link.to}
                className="px-4 py-2 border border-transparent hover:border-black rounded-md cursor-pointer"
              >
                <Link to={link.to} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" onClick={goToLogin}>
                Log in
              </Button>
              <Button
                variant="outline"
                onClick={goToSignUp}
                className="bg-blue-500 text-white hover:bg-blue-900"
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="mt-2">
              <button onClick={goToProfile}>
                <img
                  src="https://readymadeui.com/profile_2.webp"
                  alt="Profile"
                  className="w-14 h-14 rounded-full mx-auto"
                />
              </button>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
