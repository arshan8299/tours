const express=require('express');
const router=express.Router();

const hotelRoutes=require('../controllers/hotel');

router.post('/',hotelRoutes.createHotel);
router.put('/:id',hotelRoutes.updateHotel);
router.delete('/:id',hotelRoutes.deleteHotel);
router.get('/find/:id',hotelRoutes.getHotel);  
router.get("/", hotelRoutes.featuredHotel);   
router.get('/countByCity',hotelRoutes.countByCity);
router.get('/all',hotelRoutes.getAllHotel);  
router.get('/query',hotelRoutes.getHotelQuery); 
router.get('/countByType',hotelRoutes.countByType); 
router.get('/room/:id',hotelRoutes.getHotelRooms);

module.exports=router;
 