// Import the Product model (adjust path if necessary)
const Product = require('../models/product');

describe('Product Model Validation', () => {

  // Test case for creating a product with all required fields (should be valid)
  test('should be valid if all required fields are provided', () => {
    const validProduct = new Product({
      name: 'Test Product',
      price: 10.99,
      description: 'A product for testing',
      store: '60d5ecb8b48734001f5e8d8f', // Example valid ObjectId string for store ref
      image: 'http://example.com/image.jpg' // Add the required image field
      // Add other fields as required by your schema
    });
    // validateSync() returns validation errors if any, or undefined if valid
    const error = validProduct.validateSync();
    expect(error).toBeUndefined(); // Expect no validation errors
  });

  // Test case for missing product name
  test('should be invalid if name is missing', () => {
    const productWithoutName = new Product({
      // name is missing
      price: 10.99,
      description: 'A product without a name',
      store: '60d5ecb8b48734001f5e8d8f',
      image: 'http://example.com/image.jpg' // Also add image here if needed for consistency, though not strictly necessary for *this* specific test's goal
    });
    const error = productWithoutName.validateSync();
    // Expect an error object to exist
    expect(error).toBeDefined();
    // Expect the error object to have an 'errors' property,
    // and within that, an error specifically for the 'name' field.
    expect(error.errors.name).toBeDefined();
  });

  // Test case for missing product price
  test('should be invalid if price is missing', () => {
    const productWithoutPrice = new Product({
      name: 'Test Product Without Price',
      // price is missing
      description: 'A product without a price',
      store: '60d5ecb8b48734001f5e8d8f',
      image: 'http://example.com/image.jpg' // Also add image here if needed for consistency
    });
    const error = productWithoutPrice.validateSync();
    expect(error).toBeDefined();
    expect(error.errors.price).toBeDefined(); // Check for price validation error
  });

  // Add more tests here for other validation rules (e.g., price minimum, description length, etc.)

});