import express from "express";
import {getUsers, addUser, updateUser, deleteUser , addRegister , login ,updateLogin } from "../controllers/user.js"
import {addMorador,getMoradorID,updateMorador,deleteMorador,getMorador,getTotalMoradores} from "../controllers/morador.js"


const router = express.Router();


router.post("/registro", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// login
router.post("/register",addRegister);
router.get("/usuario", getUsers);
router.post("/login", login);
router.put("/login/:id", updateLogin);


// morador
router.get("/morador", getMorador);
router.post("/morador", addMorador);
router.get("/morador/:id", getMoradorID);
router.put("/morador/:id", updateMorador);
router.delete("/morador/:id", deleteMorador);
router.get("/moradores/total", getTotalMoradores);


export default router;