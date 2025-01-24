import Products from "../models/userSchema.js";

class UserController {
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
