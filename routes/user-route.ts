import express from "express";
import { editUser,getAllUsers,deleteUser,getUserById,login,register } from "../controller/user-controller";

const router = express.Router()

router.get('/',getAllUsers);

router.get('/:id',getUserById);

router.post('/login',login);

router.post('/register',register);

router.patch('/:id',editUser);

router.delete('/:id',deleteUser)

export default router;