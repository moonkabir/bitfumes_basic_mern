import { Router } from "express";

const router = Router();

router.post('/register', (req, res)=>{
    res.json({message: "Successfully registered"});
});

export default router;