import {postJob, getAllJobs, getJobByID, getJobsByAdmin, getJobByTitle, getJobsByLocation} from "../controller/jobController.js";
import express from "express";
import isUthenticated from "../middlewares/isAuthenticated.js";
import axios from "axios";
const router = express.Router();

router.route("/post").post(isUthenticated, postJob);
router.route("/get/:id").get(isUthenticated, getJobByID);
router.route("/all").get(isUthenticated, getAllJobs);
router.route("/adminJobs").get(isUthenticated, getJobsByAdmin);
router.route("/get/:title").get(isUthenticated, getJobByTitle);
router.route("/get/:location").get(isUthenticated, getJobsByLocation);
router.get("/search", async (req, res) => {
  const { title, location } = req.query;

  try {
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: `${title} in ${location}`,
        page: "1",
        num_pages: "1",
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
});

export default router;