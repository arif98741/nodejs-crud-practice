import express from "express"
import { allPatients, findPatient, login, patientRegister } from "../controllers/userController.js";

const router = express.Router();
router.post("/patient/register", patientRegister);
router.post("/patient/login", login);
router.get("/patient/find", findPatient);
router.get("/patient/all/:page", allPatients);

export default router;