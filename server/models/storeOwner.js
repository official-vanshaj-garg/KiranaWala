const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

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
// Hash password before saving
storeOwnerSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next(); // Exit early if password hasn't changed
  }

  // --- Start of code that was inside the try block ---
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  // No need to call next() here for async hooks unless returning early
  // --- End of code that was inside the try block ---

  // The try { ... } catch(error) { next(error); } wrapper should be completely gone.
});

// Method to compare password
storeOwnerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// --- End of added code ---

module.exports = mongoose.model("StoreOwner", storeOwnerSchema);
