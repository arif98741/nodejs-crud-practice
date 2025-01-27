import express from "express"
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';
import {
    deleteAppointment,
    getAllAppointments,
    postAppontment,
    updateAppointmentStatus

} from './../controllers/appointmentController.js';

const router = express.Router();
router.post("/post", isPatientAuthenticated, postAppontment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;