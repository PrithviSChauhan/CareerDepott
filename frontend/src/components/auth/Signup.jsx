import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast, Toaster } from "sonner";
import signupPagenobg from "../../assets/signupPagenobg.png";
import { Label } from "../ui/label";
import Footer from "../Footer";

const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNum, setPhone] = useState("");
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !phoneNum || !role || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,{
          fullname,
          email,
          role,
          password,
          phoneNum
        }
      );

      if (response.data.success) {
        toast.success("Registration Successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen">
        <Toaster />

        <div className="w-full lg:w-1/2 bg-gray-900 text-white p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">Create an account</h2>
          <p className="text-sm mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Log in
            </Link>
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <input
              className="border-gray-300 border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
              type="text"
              placeholder="Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
              type="text"
              placeholder="Phone No."
              value={phoneNum}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* <input
              type="file"
              accept="image/*"
              className="bg-gray-800 p-3 rounded-lg w-full border border-gray-300 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer" // Styled file input
              onChange={(e) => setFile(e.target.files[0])}
            /> */}

            <div className="relative">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <RadioGroup
              className="flex flex-row gap-4"
              onValueChange={(value) => setRole(value)}
            >
              <div className="bg-gray-800 p-3 rounded-lg">Role: </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="w-5 h-5 border-2 border-gray-400 rounded-full data-[state=checked]:bg-yellow-600
"
                />
                <Label
                  htmlFor="student"
                  className="text-white font-medium cursor-pointer"
                >
                  Student
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="w-5 h-5 border-2 border-gray-400 rounded-full data-[state=checked]:bg-yellow-600
"
                />
                <Label
                  htmlFor="recruiter"
                  className="text-white font-medium cursor-pointer"
                >
                  Recruiter
                </Label>
              </div>
            </RadioGroup> 

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gray-900">
          <img
            src={signupPagenobg}
            alt="Signup"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
