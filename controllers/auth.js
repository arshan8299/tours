const Users = require('../models/user'); // Use uppercase for model names
const bcrypt = require("bcrypt"); // Use require for importing modules

exports.register = async (req, res) => {
  const { username, password ,email} = req.body;
  try {
    // Hash the password before saving the user
    const hash = await bcrypt.hash(password, 10);
    
    const newUser = await Users.create({
      username,
      password: hash,
      email,
    });

    res.json({ msg: "New user created", user: newUser });
  } catch (err) {
    console.error(err);

   
  }
};

exports.login = async (req, res) => {
  try {
    const existingUser = await Users.findOne({ username: req.body.username });
    if (!existingUser) {
      return res.status(404).json({ msg: "User does not exist" }); // Use return to exit the function after sending the response
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid password" }); // Use return to exit the function after sending the response
    }

    // Do not save the user again here, as it is a login operation
    res.status(200).json({ msg: "User login success" });

  } catch (err) {
    console.error(err); // Use console.error for error logging
    res.status(500).send("Internal Server Error"); 
  }
};

