const express=require('express');
const router=express.Router();
const roomRoute=require('../controllers/rooms');

router.post('/create/:id',roomRoute.createRoom);
router.put('/:id',roomRoute.updateRoom);
router.delete(':id',roomRoute.deleteRoom);
router.get('/:id',roomRoute.getRoom)
router.get('/',roomRoute.getRooms)



module.exports=router;