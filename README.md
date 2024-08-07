# Twitter-like Application

This project is a Twitter-like web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes features such as video uploads, subscription plans, a reward system, multi-language support, and enhanced login security.

## Features

- **Video Uploads**: Users can upload videos as tweets or posts with restrictions on size and duration.
- **Subscription Plans**: Monthly and Yearly plans offering increased posting limits and premium features.
- **Reward System**: Points and badges awarded for user contributions and engagement.
- **Multi-Language Support**: Supports multiple languages with OTP verification for language changes.
- **Login Security**: OTP-based authentication and device tracking for enhanced security.

## Technologies Used

- **Frontend**: React.js, i18next for internationalization.
- **Backend**: Node.js, Express.js for API development.
- **Database**: MongoDB for data storage.
- **Cloud Services**: Cloudinary for video storage, Firebase for authentication, Render for hosting, Stripe for payment processing.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Avinash-31/Twitter/.git
   cd Twitter
   ```

2. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory.
   - Add your MongoDB URI, Cloudinary API key, Stripe API keys, and other necessary environment variables.

4. **Run the server**:

   ```bash
   cd backend
   npm start
   ```

5. **Run the client**:

   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**:

   Open your web browser and navigate to `http://localhost:3000` to view the application.

## Contributors

- Avinash Yeddu

## License

This project is licensed under the MIT License - see the LICENSE file for details.
