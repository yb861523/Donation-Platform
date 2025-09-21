# Donation Platform

A comprehensive web application that connects donors with those in need, featuring a modern React frontend and robust Node.js backend with MongoDB. The platform includes admin functionality for managing donations, contacts, and users.

## 🌟 Features

### For Donors
- **Easy Registration & Login**: Secure user authentication system
- **Multiple Donation Types**: Support for food, clothing, and other essentials
- **Real-time Tracking**: Monitor donation status from submission to delivery
- **Location-based Matching**: Connect with nearby recipients
- **Impact Dashboard**: View donation statistics and community impact

### For Recipients
- **Request System**: Submit requests for specific needs
- **Status Updates**: Track request fulfillment progress
- **Community Support**: Connect with donors and volunteers

### Admin Dashboard
- **Comprehensive Analytics**: Overview of donations, contacts, and users
- **Donation Management**: Track, update, and manage donation statuses
- **Contact Management**: Handle inquiries and support requests
- **User Management**: Monitor platform users and activity
- **Data Visualization**: Interactive charts and statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing tool
- **Concurrently** - Run multiple commands concurrently

## 📁 Project Structure

```
donation-platform/
├── backend/                 # Node.js/Express backend
│   ├── middleware/          # Authentication middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── .env                # Environment variables
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── config/        # API configuration
│   │   ├── .env           # Frontend environment variables
│   │   └── main.jsx       # React app entry point
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/donation_platform?retryWrites=true&w=majority

   # Admin Credentials
   ADMIN_EMAIL=admin@donationplatform.com
   ADMIN_PASSWORD=admin123
   ADMIN_NAME=Platform Admin
   ADMIN_JWT_SECRET=admin_jwt_secret_key_here
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Running Both Services

For development, you can run both frontend and backend simultaneously:

1. **Install concurrently (optional):**
   ```bash
   npm install -g concurrently
   ```

2. **Run both services:**
   ```bash
   # From root directory
   concurrently "cd backend && npm start" "cd frontend && npm run dev"
   ```

## 📖 Usage

### User Registration & Login
1. Visit the application at `http://localhost:5173`
2. Click "Register" to create a new account
3. Fill in your details and select your role (Donor/Recipient)
4. Login with your credentials

### Making a Donation
1. Navigate to the "Donate" page
2. Select donation type (Food, Clothing, etc.)
3. Fill in donation details and location
4. Submit your donation

### Admin Access
1. Visit `http://localhost:5173/admin/login`
2. Use admin credentials from `.env` file
3. Access dashboard with full platform analytics

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create new donation
- `GET /api/stats` - Get donation statistics

### Contacts
- `POST /api/contact` - Submit contact form

### Admin Routes (Protected)
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/dashboard/overview` - Dashboard statistics
- `GET /api/admin/dashboard/donations` - Manage donations
- `GET /api/admin/dashboard/contacts` - Manage contacts
- `GET /api/admin/dashboard/users` - Manage users

## 👨‍💼 Admin Features

The admin dashboard provides comprehensive platform management:

### Dashboard Overview
- Total donations, contacts, and users statistics
- Recent activity feeds
- Data visualization with charts

### Donation Management
- View all donations with filtering and pagination
- Update donation status (pending → assigned → delivered)
- Assign volunteers to donations
- Add pickup notes and delivery tracking

### Contact Management
- View and respond to user inquiries
- Update contact status and assign handlers
- Track response history

### User Management
- Monitor registered users
- View user roles and activity
- Manage user accounts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration for code quality
- Write meaningful commit messages
- Test API endpoints thoroughly
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact:
- Email: support@donationplatform.com
- Create an issue in this repository

## 🔄 Future Enhancements

- [ ] Mobile application (React Native)
- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Integration with mapping services
- [ ] Volunteer management system
- [ ] Automated matching algorithm

---

**Made with ❤️ for communities in need**