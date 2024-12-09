import configs from '@/src/config';
import { PropertyModel } from '@/src/database/models/property.model';
import mongoose from 'mongoose';

// Sample user data
const properties = [
  {
    cognitoSub: "857468d1-a9dc-4949-b111-5c6215511d85",
    title: [
      { content: "Modern Apartment", language: "en" },
      { content: "អាផាតមិនទំនើប", language: "kh" },
    ],
    description: [
      { content: "An elegant apartment with top-notch amenities.", language: "en" },
      { content: "អាផាតមិនដ៏ប្រណិតជាមួយសេវាកម្មខ្ពស់បំផុត។", language: "kh" },
    ],
    thumbnail: "https://example.com/images/thumbnail7.jpg",
    images: [
      "https://example.com/images/image13.jpg",
      "https://example.com/images/image14.jpg",
    ],
    urlmap: "https://maps.google.com/?q=location7",
    address: [
      { content: "4040 Cedar Ave", language: "en" },
      { content: "4040 ផ្លូវសេដា", language: "kh" },
    ],
    location: [
      { content: "Urban Area", language: "en" },
      { content: "តំបន់ទីក្រុង", language: "kh" },
    ],
    price: 500000,
    category: [
      { content: "Apartment", language: "en" },
      { content: "អាផាតមិន", language: "kh" },
    ],
    transition: [
      { content: "For Rent", language: "en" },
      { content: "សម្រាប់ជួល", language: "kh" },
    ],
    detail: [
      {
        language: "en",
        content: new Map([
          ["bedrooms", "2"],
          ["bathrooms", "1"],
          ["size", "1000 sqft"],
        ]),
      },
      {
        language: "kh",
        content: new Map([
          ["បន្ទប់គេង", "2"],
          ["បន្ទប់ទឹក", "1"],
          ["ទំហំ", "1000 ជាន់ការ"],
        ]),
      },
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cognitoSub: "74b8c408-c0d1-706e-e4d3-3a4061d4d0e3",
    title: [
      { content: "Beachside Bungalow", language: "en" },
      { content: "ផ្ទះបុណ្យផ្ទាំងសមុទ្រ", language: "kh" },
    ],
    description: [
      { content: "A quaint bungalow just steps from the beach.", language: "en" },
      { content: "ផ្ទះបុណ្យដ៏គួរអោយចាប់អារម្មណ៍ជិតសមុទ្រ។", language: "kh" },
    ],
    thumbnail: "https://example.com/images/thumbnail8.jpg",
    images: [
      "https://example.com/images/image15.jpg",
      "https://example.com/images/image16.jpg",
    ],
    urlmap: "https://maps.google.com/?q=location8",
    address: [
      { content: "5050 Ocean Blvd", language: "en" },
      { content: "5050 ផ្លូវសមុទ្រ", language: "kh" },
    ],
    location: [
      { content: "Beachfront", language: "en" },
      { content: "មុខឆ្នេរ", language: "kh" },
    ],
    price: 850000,
    category: [
      { content: "Bungalow", language: "en" },
      { content: "បុណ្យផ្ទះ", language: "kh" },
    ],
    transition: [
      { content: "For Sale", language: "en" },
      { content: "សម្រាប់លក់", language: "kh" },
    ],
    detail: [
      {
        language: "en",
        content: new Map([
          ["bedrooms", "3"],
          ["bathrooms", "2"],
          ["size", "2000 sqft"],
          ["garden", "Yes"],
        ]),
      },
      {
        language: "kh",
        content: new Map([
          ["បន្ទប់គេង", "3"],
          ["បន្ទប់ទឹក", "2"],
          ["ទំហំ", "2000 ជាន់ការ"],
          ["សួន", "មាន"],
        ]),
      },
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cognitoSub: "74b8c408-c0d1-706e-e4d3-3a4061d4d0e3",
    title: [
      { content: "Mountain Cabin", language: "en" },
      { content: "ផ្ទះលើភ្នំ", language: "kh" },
    ],
    description: [
      { content: "A cozy cabin with scenic mountain views.", language: "en" },
      { content: "ផ្ទះតូចកក់ក្តៅមានទេសភាពភ្នំ។", language: "kh" },
    ],
    thumbnail: "https://example.com/images/thumbnail9.jpg",
    images: [
      "https://example.com/images/image17.jpg",
      "https://example.com/images/image18.jpg",
    ],
    urlmap: "https://maps.google.com/?q=location9",
    address: [
      { content: "6060 Mountain Rd", language: "en" },
      { content: "6060 ផ្លូវភ្នំ", language: "kh" },
    ],
    location: [
      { content: "Mountain", language: "en" },
      { content: "ភ្នំ", language: "kh" },
    ],
    price: 600000,
    category: [
      { content: "Cabin", language: "en" },
      { content: "ផ្ទះភ្នំ", language: "kh" },
    ],
    transition: [
      { content: "For Rent", language: "en" },
      { content: "សម្រាប់ជួល", language: "kh" },
    ],
    detail: [
      {
        language: "en",
        content: new Map([
          ["bedrooms", "2"],
          ["bathrooms", "1"],
          ["size", "800 sqft"],
          ["fireplace", "Yes"],
        ]),
      },
      {
        language: "kh",
        content: new Map([
          ["បន្ទប់គេង", "2"],
          ["បន្ទប់ទឹក", "1"],
          ["ទំហំ", "800 ជាន់ការ"],
          ["អាងភ្លើង", "មាន"],
        ]),
      },
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cognitoSub: "74b8c408-c0d1-706e-e4d3-3a4061d4d0e3",
    title: [
      { content: "Luxury Condo", language: "en" },
      { content: "ខនដូប្រណិត", language: "kh" },
    ],
    description: [
      { content: "A high-end condo with stunning city views.", language: "en" },
      { content: "ខនដូប្រណិតជាមួយទេសភាពទីក្រុង។", language: "kh" },
    ],
    thumbnail: "https://example.com/images/thumbnail10.jpg",
    images: [
      "https://example.com/images/image19.jpg",
      "https://example.com/images/image20.jpg",
    ],
    urlmap: "https://maps.google.com/?q=location10",
    address: [
      { content: "7070 Skyline Ave", language: "en" },
      { content: "7070 ផ្លូវស្កាយឡែន", language: "kh" },
    ],
    location: [
      { content: "City Center", language: "en" },
      { content: "មជ្ឈមណ្ឌលក្រុង", language: "kh" },
    ],
    price: 950000,
    category: [
      { content: "Condo", language: "en" },
      { content: "ខនដូ", language: "kh" },
    ],
    transition: [
      { content: "For Sale", language: "en" },
      { content: "សម្រាប់លក់", language: "kh" },
    ],
    detail: [
      {
        language: "en",
        content: new Map([
          ["bedrooms", "3"],
          ["bathrooms", "3"],
          ["size", "2000 sqft"],
        ]),
      },
      {
        language: "kh",
        content: new Map([
          ["បន្ទប់គេង", "3"],
          ["បន្ទប់ទឹក", "3"],
          ["ទំហំ", "2000 ជាន់ការ"],
        ]),
      },
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cognitoSub: "857468d1-a9dc-4949-b111-5c6215511d85",
    title: [
      { content: "Seaside Cottage", language: "en" },
      { content: "ផ្ទះតូចជាប់សមុទ្រ", language: "kh" },
    ],
    description: [
      { content: "A charming cottage with ocean views.", language: "en" },
      { content: "ផ្ទះតូចគួរឱ្យស្រឡាញ់ជាមួយទេសភាពសមុទ្រ។", language: "kh" },
    ],
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE8xGYp80KIX-wYPSza6W5P_IK5QFZNqh-K8FENwgkIJt3hiT3h0RNAOUytEVKa5wQfYw&usqp=CAU",
    images: [
      "https://example.com/images/image21.jpg",
      "https://example.com/images/image22.jpg",
    ],
    urlmap: "https://maps.google.com/?q=location11",
    address: [
      { content: "8080 Beach Rd", language: "en" },
      { content: "8080 ផ្លូវឆ្នេរ", language: "kh" },
    ],
    location: [
      { content: "Beachfront", language: "en" },
      { content: "មុខឆ្នេរ", language: "kh" },
    ],
    price: 700000,
    category: [
      { content: "Cottage", language: "en" },
      { content: "ផ្ទះតូច", language: "kh" },
    ],
    transition: [
      { content: "For Rent", language: "en" },
      { content: "សម្រាប់ជួល", language: "kh" },
    ],
    detail: [
      {
        language: "en",
        content: new Map([
          ["bedrooms", "2"],
          ["bathrooms", "2"],
          ["size", "1200 sqft"],
          ["patio", "Yes"],
        ]),
      },
      {
        language: "kh",
        content: new Map([
          ["បន្ទប់គេង", "2"],
          ["បន្ទប់ទឹក", "2"],
          ["ទំហំ", "1200 ជាន់ការ"],
          ["លាន", "មាន"],
        ]),
      },
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


// Function to connect to the database and insert data
const insertData = async () => {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log('Connected to MongoDB.');
    const inserted = await PropertyModel.create(properties);
    console.log('Data inserted:', inserted);
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

insertData();
