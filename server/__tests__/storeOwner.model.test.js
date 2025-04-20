const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const StoreOwner = require("../models/storeOwner");
const bcrypt = require("bcrypt");

let mongoServer; // Variable to hold the server instance

// Runs once before all tests in this suite
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // Start the server
  const mongoUri = mongoServer.getUri(); // Get the connection URI
  await mongoose.connect(mongoUri); // Connect Mongoose
});

// Runs once after all tests in this suite
afterAll(async () => {
  await mongoose.disconnect(); // Disconnect Mongoose
  await mongoServer.stop(); // Stop the in-memory server
});

// Optional: Runs before each test - clears data for isolation
beforeEach(async () => {
  // Clear existing data before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}); // Delete all documents
  }
});

describe("StoreOwner Model", () => {
  test("should hash store owner password before saving", async () => {
    const plainPassword = "password123";
    const ownerData = {
      // Ensure ALL required fields from your schema are here
      username: "test_hash_user", // Added username
      email: "owner_hash@example.com",
      password: plainPassword,
      store: {
        // Added required store fields
        name: "Test Store Hash",
        description: "Testing hashing",
        category: "Test Category",
      },
      // Add any other required fields
    };

    const storeOwner = new StoreOwner(ownerData);

    // --- Change validate() to save() ---
    await storeOwner.save(); // Actually save the document to trigger the hook

    // --- Assertions ---
    // Fetch the saved document to be absolutely sure (optional but robust)
    // const savedOwner = await StoreOwner.findById(storeOwner._id);
    // expect(savedOwner.password).toBeDefined();
    // expect(savedOwner.password).not.toBe(plainPassword);

    // Check the instance password AFTER save() completes
    expect(storeOwner.password).toBeDefined();
    expect(storeOwner.password).not.toBe(plainPassword); // This should now pass

    // Check hash format and compare
    expect(storeOwner.password).toMatch(/^\$2[aby]\$/);
    const isMatchSync = bcrypt.compareSync(plainPassword, storeOwner.password);
    expect(isMatchSync).toBe(true);
  });

  // Add other tests for the StoreOwner model
});
