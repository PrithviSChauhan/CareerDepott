import React, { useState } from "react";
import welcomelogin from "../../assets/welcomelogin.png";
import { Link } from "react-router-dom";
import loginPage from "../../assets/loginPage.png";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "some error occured");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "some error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" bg-gray-900 min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between p-8">
        <Toaster />
        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md object-cover"
            src={loginPage}
            alt="welcome"
          />
        </div>

        {/* Login form section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            Login
          </h1>

          <div className="flex items-center justify-center pb-4">
            <p className="self-center md:self-center text-white text-sm">
              Don't have an account?
              <Link to="/signup" className="text-blue-600">
                {" "}
                Sign up
              </Link>
            </p>
          </div>

          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
            />
            <RadioGroup
              className="flex flex-row gap-4 mt-4 pb-4"
              onValueChange={(value) => setRole(value)}
            >
              <div className="bg-gray-800 p-3 rounded-lg text-white">
                Role:{" "}
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="w-5 h-5 border-2 border-gray-400 rounded-full data-[state=checked]:bg-yellow-600"
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
                  className="w-5 h-5 border-2 border-gray-400 rounded-full data-[state=checked]:bg-yellow-600"
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
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 text-white">Or register with</div>
          <div className="flex gap-4 mt-2">
            <button className="bg-white text-black py-2 w-1/2 rounded">
              Google
            </button>
            <button className="bg-white text-black py-2 w-1/2 rounded">
              Apple
            </button>
          </div>
        </div>
      </div>
      <div className="border-t-white border-t-2">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
