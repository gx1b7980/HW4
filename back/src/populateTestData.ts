import sequelize from './models/sequelizeInstance.js'; // Note the '.js' extension
import { User } from './models/User.js'; // Note the '.js' extension
import argon2 from 'argon2';

// Define an array of test user data
const testData = [
  { username: 'user1', password: 'password123', email: 'test@test.com', name: 'Test User'},
  { username: 'user2', password: 'password456', email: 'test2@test.com', name: 'Test User 2' }
];

const populateData = async () => {
  await sequelize.sync({ force: true }); // Be careful with { force: true } as it will drop tables
  
  for (const { username, password, email, name } of testData) {
    const passwordHash = await argon2.hash(password);
    await User.create({
      username,
      passwordHash,
      email,
      name,
    });
  }

  console.log('Test data populated successfully.');
};

populateData()
  .then(() => process.exit())
  .catch((error) => {
    console.error('Failed to populate test data:', error);
    process.exit(1);
  });


