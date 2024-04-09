const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: root,
  password: "root",
  database: "brotrition",
});

module.exports = db;

// const executeQuery = async (query, data) => {
//   try {
//     const db = await mysql.createConnection({
//       host: "localhost",
//       port: "3002",
//       database: "brotrition",
//       user: "root",
//       password: "",
//     });
//     const [result] = await db.execute(query, data);

//     await db.end();
//     console.log(result);

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export default executeQuery;
