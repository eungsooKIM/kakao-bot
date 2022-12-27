const database = require("./dataSource");

const check = async (email) => {
  return await database.query(
    `SELECT * 
        FROM users
        WHERE email=?
        `,
    [email]
  );
};


module.exports = { check };
