import express from "express"
import {
   addNewAdmin,
   allPatients,
   findPatient,
   login,
   patientRegister
} from "../controllers/userController.js";

import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post("/patient/register", patientRegister);
router.post("/patient/register", patientRegister);
router.post("/patient/login", login);
router.post("/admin/new", isAdminAuthenticated, addNewAdmin);
router.get("/patient/find", findPatient);
router.get("/patient/all/:page", allPatients);

export default router;

/**
 * import express from "express"
    import * as userController from "../controllers/userController.js";

    const router = express.Router();
    router.post("/patient/register", userController.patientRegister);
    router.post("/patient/login", userController.login);
    router.get("/patient/find", userController.findPatient);
    router.get("/patient/all/:page", userController.allPatients);

    export default router;
    * 
 */