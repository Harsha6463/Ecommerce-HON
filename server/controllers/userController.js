import Products from "../models/userSchema.js";
import User from '../models/ecoUser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config()
class UserController {








  async createUser(req, res) {
    try {
      const { mobileNo } = req.body;

      if (mobileNo.length !== 10) {
        return res.status(400).json({ message: "Mobile number must be exactly 10 digits long." });
      }
  
      const existingUser = await User.findOne({ mobileNo: req.body.mobileNo });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this mobile number." });
      }
  
    
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json({ message: "User saved successfully.", savedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

  async loginUser(req, res){
    try {
      const user = await User.findOne({ mobileNo: req.body.mobileNo });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  //Products Api

  async getProducts(req, res) {
    try {
      const getProducts = await Products.find();
      console.log(getProducts);
      res.status(200).json(getProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getproductstype(req, res) {
    const individualData = req.params.productType;
    console.log(individualData);
    const respData = await Products.find({ productType: individualData });
    console.log(respData);
    res.send(respData);
  }
}
export default new UserController();
