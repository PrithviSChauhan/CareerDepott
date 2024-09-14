import { Job } from "../models/jobModel.js";

//admin
export const postJob = async (req, res) => {
    try {
        const {title, description, location, salary, jobType, totalOpenings, companyID, experience, position, requirements} = req.body;
        const userID = req.id;

        if(!title|| !description|| !location|| !salary|| !jobType|| !totalOpenings|| !companyID|| !experience|| !position|| !requirements){
            return res.status(400).json({
                message: "some field empty!",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number,
            jobType,
            totalOpenings,
            companyID,
            experienceLevel: experience,
            position,
            company: companyID,
            createdBy: userID 
        });

        return res.status(200).json({
            message: "new job created successfully!",
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

//student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || " ";

        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        };

        const jobs = await Job.find(query);

        if(!jobs){
            return res.status(404).json({
                message: "job not found!",
                successL: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//student
export const getJobByID = async (req, res) => {
    try {
        const jobID = req.params.id;

        const job = await Job.findById(jobID);

        if(!job){
            return res.status(404).json({
                message: "job not found!",
                successL: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

//admin
export const getJobsByAdmin = async (req, res) => {
    try {
        const adminID = req.id;

        const jobs = await Job.find({createdBy: adminID});

        if(!jobs){
            return res.status(404).json({
                message :"couldnt find admin jobs",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}