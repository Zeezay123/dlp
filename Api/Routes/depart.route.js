import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createDepartment);
router.get("/getdepart", getDepartments);
router.get("/getdepart/:id", getDepartments);
router.put("/:departmentId", verifyToken, updateDepartment);
router.delete("/:departmentId", verifyToken, deleteDepartment);

export default router;
