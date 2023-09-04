const Joi = require('joi');

//*******Simple Use*******//

// Define a schema for a complex object
const complexObjectSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(99).required(),
  isSubscribed: Joi.boolean().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().regex(/^\d{5}$/).required(),
  }),
  hobbies: Joi.array().items(Joi.string().valid('reading', 'cooking', 'gaming', 'traveling')),
  role: Joi.string().valid('user', 'admin', 'moderator'),
});

// Sample data to validate
const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 25,
  isSubscribed: true,
  address: {
    street: '123 Main St',
    city: 'Exampleville',
    zipCode: '12345',
  },
  hobbies: ['reading', 'traveling'],
  role: 'user',
};

const { error, value } = complexObjectSchema.validate(userData, { abortEarly: false });
if (error) {
  console.error("Validation Errors:");
  error.details.forEach((detail, index) => {
  console.error(`Error ${index + 1}: ${detail.message}`);
    });
} else {
    console.log('Data is valid:', value);
}



//*******In Validating Post Requests*******//

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.post('/register', (req, res) => {
  // Validate the data against the schema
  const { error, value } = complexObjectSchema.validate(req.body, { abortEarly: false });
    if (error) {
    // If validation fails, return an error response
    res.status(400).json({ error: error.details[0].message });
  } else {
    // If validation passes, process the data
    // value contains the validated request data
    // You can access it as value.username, value.email, etc.
    // ... your processing logic ...
    res.json({ message: 'Registration successful' });
  }
}


/*
In this example:

We define a complex schema called complexObjectSchema that includes various types of validations:

username: A string with alphanumeric characters, minimum length of 3, maximum length of 30, and required.
email: A valid email address and required.
age: An integer between 18 and 99 (inclusive) and required.
isSubscribed: A boolean value and required.
address: An object with specific properties:
street: A required string.
city: A required string.
zipCode: A required string with a specific regex pattern.
hobbies: An array of strings with specific valid values.
role: A string with specific valid values.
We provide sample userData to validate against the complexObjectSchema.

We use the validate method to validate the userData against the schema. 
We also set abortEarly: false to collect all validation errors instead of stopping at the first one.
To stop at the first error we can remove abortEarly:

If there are validation errors, we iterate through them and print each error message. Otherwise, we print that the data is valid along with the validated value.

*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

