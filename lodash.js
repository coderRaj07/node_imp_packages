const { get, set } = require('lodash');

// Example 1: Using get to access nested properties
const user = {
  id: 1,
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zip: '12345'
  }
};

const cityName = get(user, 'address.city');
console.log(cityName); // Output: 'Anytown'

// Example 2: Providing a default value with get
const countryCode = get(user, 'address.country', 'US');
console.log(countryCode); // Output: 'US'

// Example 3: Using set to update nested properties
const updatedUser = set(user, 'address.zip', '54321');
console.log(updatedUser);
/*
Output:
{
  id: 1,
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zip: '54321' // Zip code updated
  }
}
*/
