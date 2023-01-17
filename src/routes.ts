import { Router } from 'express';
import multer from 'multer';

const router = Router();


router.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})

export { router }; 