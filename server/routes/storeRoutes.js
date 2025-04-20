const express = require("express");
const router = express.Router();
const Store = require("../models/store");
const StoreOwner = require("../models/storeOwner");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register store owner
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      storeName,
      storeDescription,
      storeCategory,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !storeName ||
      !storeDescription ||
      !storeCategory
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingOwner = await StoreOwner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new store owner
    const storeOwner = new StoreOwner({
      username,
      email,
      password: hashedPassword,
      store: {
        name: storeName,
        description: storeDescription,
        category: storeCategory,
        products: [],
      },
    });

    await storeOwner.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login store owner
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find store owner
    const storeOwner = await StoreOwner.findOne({ email });
    if (!storeOwner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, storeOwner.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: storeOwner._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token, storeId: storeOwner._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add product route
router.post("/products", async (req, res) => {
  try {
    console.log("Received product data:", req.body); // Debug log

    const { name, price, description, image, storeId } = req.body;

    // Validate required fields
    if (!name || !price || !description || !image || !storeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the product
    const product = new Product({
      name,
      price,
      description,
      image,
      store: storeId,
    });

    const savedProduct = await product.save();
    console.log("Saved product:", savedProduct); // Debug log

    // Update store's products array
    await Store.findByIdAndUpdate(
      storeId,
      { $push: { products: savedProduct._id } },
      { new: true },
    );

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Add product error:", error);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
});

// Get all products for a store
router.get("/products/:storeId", async (req, res) => {
  try {
    const products = await Product.find({ store: req.params.storeId });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Update a product
router.put("/products/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true },
    );
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete a product
router.delete("/products/:productId/:storeId", async (req, res) => {
  try {
    // Remove product from store's products array
    await Store.findByIdAndUpdate(req.params.storeId, {
      $pull: { products: req.params.productId },
    });

    // Delete the product
    await Product.findByIdAndDelete(req.params.productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const stores = await StoreOwner.find(
      {},
      {
        username: 1,
        email: 1,
        store: 1,
      },
    );
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this new route
router.get("/:storeId/products", async (req, res) => {
  try {
    const products = await Product.find({ store: req.params.storeId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Assuming it's in a catch block like this
someAsyncFunction().catch(error => { // Original line
    console.error("Something went wrong"); // Using console, but not the 'error' variable
    res.status(500).json({ message: 'Server error' });
});

// Change it to:
someAsyncFunction().catch(_error => { // Rename 'error' to '_error'
  
    console.error("Something went wrong");
    res.status(500).json({ message: 'Server error' });
});

// OR if it's in middleware like this:
app.use((error, req, res, next) => { // Original line
    console.error("Unhandled error:", error.stack); // Using 'error' here
    res.status(500).send('Something broke!');
});
// If 'error' *is* used (like above), the lint error shouldn't occur.
// If 'error' is NOT used, like this:
app.use((error, req, res, next) => { // Original line
    console.error("An error occurred!"); // Not using 'error' variable
    res.status(500).send('Something broke!');
});
// Change it to:
app.use((_error, req, res, next) => { // Rename 'error' to '_error'
    console.error("An error occurred!");
    res.status(500).send('Something broke!');
});


module.exports = router;
