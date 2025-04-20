const mongoose = require("mongoose");
// Add bcrypt require statement
const bcrypt = require("bcrypt");
// Define salt factor
const SALT_WORK_FACTOR = 10; // Standard salt rounds for bcrypt

const storeOwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // Consider adding minlength here if desired
    // minlength: [6, 'Password must be at least 6 characters long']
  },
  store: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    products: [
      {
        name: String,
        price: Number,
        description: String,
        image: String,
      },
    ],
  },
  // Consider adding a createdAt field
  // createdAt: { type: Date, default: Date.now }
});

// --- Add the pre-save hook here ---
storeOwnerSchema.pre("save", async function (next) {
  const owner = this; // 'this' refers to the document being saved

  // Only hash the password if it has been modified (or is new)
  if (!owner.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // Hash the password using the new salt
    const hash = await bcrypt.hash(owner.password, salt);
    // Override the cleartext password with the hashed one
    owner.password = hash;
    next(); // Proceed with saving
  } catch (err) {
    next(err); // Pass errors to Mongoose
  }
});

// Optional: Add the comparePassword method
storeOwnerSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error; // Re-throw error for handling elsewhere
  }
};
// --- End of added code ---

module.exports = mongoose.model("StoreOwner", storeOwnerSchema);
