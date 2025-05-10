# Zesty Zoom MERN Stack E-Commerce Food Delivery Website

<p align="center">
  <img src="https://via.placeholder.com/200?text=Zesty+Zoom+Logo" alt="Zesty Zoom Logo" width="200"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#security-implementation">Security</a> •
  <a href="#api-documentation">API</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#contributing">Contributing</a>
</p>

Zesty Zoom is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It serves as a modern food delivery platform where users can browse food items, add them to a cart, place orders, and manage their accounts, while admins can manage the menu and monitor order activity.

## Features

### User Features
- User authentication (JWT-based login and registration)
- View food menu with categories and discounts
- Add/remove items to/from cart
- Place and track orders
- View order history
- Update user details

### Admin Features
- Admin login
- Add, update, delete food items
- Manage categories and discounts
- View user orders

## Tech Stack

### Frontend:
- React (with Hooks and Context API)
- Axios for API calls
- razorpay for payment gateway
- React Router Dom for routing
- CSS (Bootstrap)

### Backend:
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for secure auth and token verification
- bcrypt for password hashing
- Payment gateway integration (Razorpay)
- Multer + Cloudinary for image uploads

## Folder Structure
```
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── store/
│       └── App.jsx
└── server/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── utils/
        ├── app.js
        └── index.js
    └── public/
        ├── images/
```

## Installation

1. Clone the repository
   ```bash
   [git clone https://github.com/yourusername/zesty-zoom.git](https://github.com/ravi-kumar-kushwaha/ZestyZoom.git)
   cd zesty-zoom
   ```

2. Install dependencies for both client and server
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. Run the development server
   ```bash
   # Run backend server
   cd server
   npm run dev

   # In a new terminal, run frontend
   cd client
   npm run dev
   ```

5. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Security Implementation

### Authentication
- JWT tokens are stored in `localStorage`
- Protected routes for users and admins
- Authorization headers sent with every request

### Cart Management
- Cart is stored in context (`CartContext`)
- Items can be added/removed
- Quantities are tracked
- Cart persists via backend + context state

### Media Handling
- Cloudinary is used for uploading and managing food item images
- Images are uploaded via `multer` on the backend

## Best Practices Followed
- RESTful APIs
- Context API for state management
- Error boundaries for frontend
- Modular code structure
- Secure storage of JWT & sensitive data
- Input validation and sanitization

## Deployment

### Frontend Deployment (Render)
1. Push your code to GitHub
2. Create a new Static Site on Render
3. Connect your GitHub repository
4. Set build command: `cd client && npm install && npm run build`
5. Set publish directory: `client/build`

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && node src/index.js`
5. Add environment variables

## API Documentation

### User Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Food Items Endpoints
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get food item by ID
- `GET /api/foods/category/:categoryId` - Get food items by category

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/pay` - Update order payment status

### Admin Endpoints
- `POST /api/admin/foods` - Add new food item
- `PUT /api/admin/foods/:id` - Update food item
- `DELETE /api/admin/foods/:id` - Delete food item
- `GET /api/admin/orders` - Get all orders (admin)

## Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Zesty+Zoom+Home+Page" alt="Home Page" width="800"/>
  <br>
  <em>Home Page</em>
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Food+Menu+Page" alt="Menu Page" width="800"/>
  <br>
  <em>Menu Page</em>
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Shopping+Cart" alt="Cart Page" width="800"/>
  <br>
  <em>Cart Page</em>
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Admin+Dashboard" alt="Admin Dashboard" width="800"/>
  <br>
  <em>Admin Dashboard</em>
</p>

## Future Enhancements
- Payment gateway integration (Stripe/PayPal)
- Real-time order tracking with Socket.io
- User reviews and ratings
- Restaurant partner portal
- Mobile app using React Native

## Contributing
This project is open-source and available under the MIT License.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Name - [Ravi Kumar Kushwaha]()
Email - [ravikumarkush1212@gmail.com](mailto:your.email@example.com)  
Project Link: [https://zestyzoom.onrender.com]

---

<p align="center">
  Made with ❤️ by Ravi Kumar Kushwaha
</p>
