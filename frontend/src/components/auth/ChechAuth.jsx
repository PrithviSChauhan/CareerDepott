import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const CheckAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // 👈

  useEffect(() => {
    if (user) return; // ✅ Don't re-check if user already present

    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/check");
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log("❌ Auth check failed");
      }
    };

    checkAuth();
  }, [user]);

  return null;
};

export default CheckAuth;
