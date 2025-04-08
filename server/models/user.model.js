const { getDbConnection } = require('../db');

const User = {
  // Create a new user
  async create(userData) {
    const db = await getDbConnection();
    
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.password]
    );
    
    await db.close();
    return result;
  },
  
  // Find a user by email
  async findOne(filter) {
    const db = await getDbConnection();
    
    let user = null;
    if (filter.email) {
      user = await db.get('SELECT * FROM users WHERE email = ?', [filter.email]);
    }
    
    await db.close();
    return user;
  },
  
  // Update a user
  async updateOne(filter, update) {
    const db = await getDbConnection();
    
    let result = null;
    if (filter.email && update.$set) {
      result = await db.run(
        'UPDATE users SET quote = ? WHERE email = ?',
        [update.$set.quote, filter.email]
      );
    }
    
    await db.close();
    return result;
  }
};

module.exports = User;