// // scripts/seedAdmin.js
// const { MongoClient } = require('mongodb');
// const bcrypt = require('bcryptjs');
// require('dotenv').config({ path: '.env.local' }); // Load .env.local

// const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_DB = process.env.MONGODB_DB;

// // --- YOUR HARDCODED CREDENTIALS ---
// const ADMIN_USERNAME = "admin";
// const ADMIN_PASSWORD = "password123"; // This will be hashed
// // ---------------------------------

// async function seedAdmin() {
//   if (!MONGODB_URI || !MONGODB_DB) {
//     console.error("MONGODB_URI or MONGODB_DB not defined in .env.local. Exiting.");
//     process.exit(1);
//   }

//   const client = new MongoClient(MONGODB_URI);

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB.");
//     const db = client.db(MONGODB_DB);
//     const adminsCollection = db.collection('admins');

//     // Check if admin already exists
//     const existingAdmin = await adminsCollection.findOne({ username: ADMIN_USERNAME });
//     if (existingAdmin) {
//       console.log(`Admin user '${ADMIN_USERNAME}' already exists. Skipping seed.`);
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10); // Hash the password

//     await adminsCollection.insertOne({
//       username: ADMIN_USERNAME,
//       password: hashedPassword, // Store the hashed password
//       createdAt: new Date(),
//     });

//     console.log(`Admin user '${ADMIN_USERNAME}' created successfully with a hashed password.`);

//   } catch (error) {
//     console.error("Error seeding admin user:", error);
//   } finally {
//     await client.close();
//     console.log("MongoDB connection closed.");
//   }
// }

// seedAdmin();