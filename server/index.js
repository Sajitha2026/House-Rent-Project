const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// சென்னை மற்றும் புதிய நகரங்களின் Apartment விவரங்கள்
let memoryProperties = [
  {
    _id: "1",
    title: "2 BHK Luxury Apartment",
    location: "Chennai",
    price: 15000,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
    description: "Modern 2 BHK apartment located in Chennai."
  },
  {
    _id: "2",
    title: "3 BHK Modern Villa",
    location: "Coimbatore",
    price: 18000,
    type: "Villa",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500",
    description: "Spacious 3 BHK villa with modern interiors and garden."
  },
  {
    _id: "3",
    title: "2 BHK Executive Apartment",
    location: "Madurai",
    price: 12000,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
    description: "Well-maintained 2 BHK apartment near central hubs."
  },
  {
    _id: "4",
    title: "1 BHK Studio Flat",
    location: "Bengaluru",
    price: 22000,
    type: "Flat",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
    description: "Fully furnished studio flat in IT corridor."
  },
  {
    _id: "5",
    title: "2 BHK Independent House",
    location: "Trichy",
    price: 10000,
    type: "House",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
    description: "Cozy independent home with broad parking space."
  },
  {
    _id: "6",
    title: "Luxury Waterfront Penthouse",
    location: "Kochi",
    price: 30000,
    type: "Penthouse",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
    description: "Premium penthouse offering backwater views."
  }
];

// Base Route
app.get('/', (req, res) => {
  res.send('HouseRent Server is running...');
});

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json(memoryProperties);
});

// Add new property
app.post('/api/properties', (req, res) => {
  const fallbackProp = { _id: Date.now().toString(), ...req.body };
  memoryProperties.push(fallbackProp);
  res.status(201).json({ message: 'Saved to Local Memory', property: fallbackProp });
});

// Auth Routes (Login / Register Compatibility)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({ token: "mock-jwt-token", user: { email, role: "admin" } });
});

app.post('/api/auth/register', (req, res) => {
  const { email, name } = req.body;
  res.status(201).json({ message: "User registered", user: { email, name, role: "user" } });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Server running successfully!`);
  console.log(`🔗 Backend API: http://localhost:${PORT}/api/properties`);
  console.log(`🔗 Frontend App: http://localhost:5173/`);
  console.log(`=================================\n`);
});