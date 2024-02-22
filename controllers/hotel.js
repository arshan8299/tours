const Hotel=require('../models/Hotels');
const Room=require('../models/room')

exports.createHotel=async(req,res)=>
{
  const newHotel= new Hotel(req.body);
  try
  {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  }
  catch(err){console.log(err)}
}

exports.updateHotel = async (req, res) => {
  const{id}=req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id);

    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(updatedHotel);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteHotel = async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      console.log(err)
    }
  };

  exports.getHotel = async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      console.log(err)
    }   
  };
  exports.getHotelQuery = async (req, res) => {
    try {
      const hotels = await Hotel.find(req.query);
  
      // Check if hotels were found
      if (hotels.length === 0) {
        return res.status(404).json({ message: 'No hotels found for the given query.' });
      }
  
      res.status(200).json(hotels);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getAllHotel = async (req, res) => {
    try {
      const hotel = await Hotel.find({});
      res.status(200).json(hotel);
      
    } catch (err) {
      console.log(err)
    }   
  };
  exports.featuredHotel = async (req, res) => {
    try {
      const { min = 1, max = 999, limit: queryLimit, ...others } = req.query;
  
      // Parse min, max, and limit as integers
      const minPrice = parseInt(min);
      const maxPrice = parseInt(max);
      const limit = parseInt(queryLimit) || 5; // Default limit of 5 if not provided
  
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: minPrice, $lt: maxPrice },
      }).limit(limit);
  
      res.status(200).json(hotels);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  exports.countByCity = async (req, res) => {
    try {
      const cities = req.query.cities.split(",");
      const counts = await Promise.all(
        cities.map(async (city) => {
          const count = await Hotel.countDocuments({ city: city });
          return { city, count };
        }) 
      );
      res.status(200).json(counts);
    } catch (err) {
      console.error('Error counting documents by city:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.countByType = async (req, res) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
      const resortCount = await Hotel.countDocuments({ type: "resorts" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabins" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      console.log(err)
    }
  };

  exports.getHotelRooms = async (req, res) => {
    try {
      const hotelId = req.params.id;  
  
      // Check if the hotel exists
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
  
      // Fetch rooms for the hotel
      const roomPromises = hotel.rooms.map((room) => Room.findById(room));
      const rooms = await Promise.all(roomPromises);
   
      res.status(200).json(rooms);
    } catch (err) {
      console.error('Error fetching hotel rooms:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };