import express from 'express';
import {registerCompany, getCompanyById, updateCompany, getCompany} from '../controller/companyController.js';
import isUthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(isUthenticated, registerCompany);
router.route("/get").post(isUthenticated, getCompany);
router.route("/get/:id").get(isUthenticated, getCompanyById);
router.route("/update/:id").post(isUthenticated, updateCompany);

export default router;