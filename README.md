# Prop Bait

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)    

![Image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Image](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)
![Image](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)          

Prop-Bait is a fishing supplies ecommerce site, built as a single-page React application, with a MERN stack that utilizes Apollo Client, GraphQL, and MUI libraries.

There are 111 unique products to search for, with most products having multiple options to choose from.

CLICK [HERE](https://calm-dawn-80232-682649ddc0c6.herokuapp.com/) TO TRY THE LIVE DEMO!

![ezgif com-optimize](https://github.com/Tbro4/prop-bait/assets/77757900/8e952eab-9571-4700-9797-6e8264525e1c)

## Installation Instructions

Follow these steps to set up the project on your machine.

## Prerequisites

- Node.js and npm must be installed. You can download them from [here](https://nodejs.org/).
- [MongoDB Atlas](https://www.mongodb.com/atlas/database). Setup a cluster and find the connection string to add to the sample.env file.

## Installation 

1. Clone the repository:

   ```sh
   git clone https://github.com/Tbro4/prop-bait.git

2. Navigate to the project root directory:

   ```sh
   cd prop-bait
   
3. Install dependencies for the server and client:

   ```sh
   npm install

5. Rename "example.env" to ".env" and add your MongoDB Atlas connection URI after "MONGODB_URI=". (You do not need to have the string in quotations)

6. Seed the database:

   ```sh
   npm run seed

## Usage

1. To start the development server and client concurrently, run:

   ```sh
   npm run develop

This command will start both the server and client, allowing you to work on both sides of the app simultaneously.

2. Access the app in your browser at http://localhost:3000.






## Features

 **- Login/Signup**

Users must signup or login to an account in order to add items to their cart and place an order. JWTs are used to keep track of logged-in status. 

![ezgif com-video-to-gif (5)](https://github.com/Tbro4/prop-bait/assets/77757900/5e53638e-3ae7-4163-9cb8-24510a28046b)


**- Multiple Search Options**

The search bar displays categories, subcategories, and individual products based on the search input.

![ezgif com-optimize (2)](https://github.com/Tbro4/prop-bait/assets/77757900/2fd1041f-5d02-4751-9787-57a8750bd235)


Users may also search for products by clicking on category images and subcategory options, as well as filter and sort those options.     Filter options are dynamically generated based on which brands and subcategories are currently available in the selected category.

![ezgif com-video-to-gif](https://github.com/Tbro4/prop-bait/assets/77757900/be413e8f-8db5-4566-b109-608224e13ce3)


**- Add To Cart**

Users may add products to a cart. Quantity is limited to 99 for any individual product. 

![ezgif com-video-to-gif (1)](https://github.com/Tbro4/prop-bait/assets/77757900/77647710-29c0-45bc-9726-a325a0f38043)


**- Edit Cart / Place Order**

Users may edit item quantites in the cart itself. Subtotals, Tax, Shipping, and Total are updated instantly upon quantity changes.  

While there is not currently an option to input payment information, a user may place an order via the "checkout" button and view the order details from their account page.

![ezgif com-video-to-gif (2)](https://github.com/Tbro4/prop-bait/assets/77757900/65b5ce8d-51f5-4fb2-8c32-39201b8abdad)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
