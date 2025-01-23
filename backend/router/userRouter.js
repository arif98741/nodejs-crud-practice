import express from "express"
import { findPatient, patientRegister } from "../controllers/userController.js";

const router = express.Router();
router.post("/patient/register", patientRegister);
router.get("/patient/find", findPatient);

export default router;