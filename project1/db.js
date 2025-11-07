const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'school',
  password: 'Frootloop5',
  port: 5432,
});

// Function to create the table
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        item_id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        price NUMERIC(5,2) NOT NULL,
        image VARCHAR(255),
        calories INTEGER,
        category VARCHAR(30),
        special_feature BOOLEAN DEFAULT FALSE,
        feature BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Function to insert a single item
const insertIntoItems = async (item) => {
  const { name, price, image, calories, category, special_feature, feature } = item;
  try {
    await pool.query(`
      INSERT INTO items (name, price, image, calories, category, special_feature, feature)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [name, price, image, calories, category, special_feature, feature]);
    console.log(`Inserted item: ${name}`);
  } catch (err) {
    console.error("Error inserting item:", err);
  }
};

// Function to seed all items
const seedItems = async () => {
  await createTable();

  const items = [
    // Breakfast
    { name: 'Toast & Eggs with Avocado', price: 7.50, image: 'breakfast1.jpg', calories: 450, category: 'Breakfast', special_feature: true, feature: false },
    { name: 'Sunshine Egg and Tomatoes', price: 7.00, image: 'breakfast3.jpg', calories: 400, category: 'Breakfast', special_feature: false, feature: true},
    { name: 'Waffle with Fruits', price: 5.99, image: 'breakfast4.jpg', calories: 350, category: 'Breakfast', special_feature: false, feature: false },
    { name: 'Toast with Fruits', price: 4.99, image: 'breakfast5.jpg', calories: 300, category: 'Breakfast', special_feature: false, feature: false },
    { name: 'Oatmeal', price: 4.99, image: 'breakfast2.jpg', calories: 300, category: 'Breakfast', special_feature: false, feature: true },

    //Entrees
    { name: 'Toast Burger', price: 7.50, image: 'entree1.jpg', calories: 450, category: 'Entrees', special_feature: true, feature: false },
    { name: 'Sandwich', price: 7.00, image: 'entree2.jpg', calories: 400, category: 'Entrees', special_feature: false, feature: true},
     { name: 'Turkey Sandwich', price: 4.99, image: 'entree3.jpg', calories: 300, category: 'Entrees', special_feature: false, feature: true },
  ];

  for (const item of items) {
    await insertIntoItems(item);
  }

  console.log("All items inserted successfully!");

  // Close the pool
  await pool.end();
};

// Run the seeding function
//seedItems();

module.exports = pool;
