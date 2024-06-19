import mysql from "mysql2/promise";

const executeQuery = async (query, data) => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      port: "3002",
      database: "brotrition",
      user: "root",
      password: "root",
    });

    const [result] = await db.execute(query, data);

    await db.end();

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default executeQuery;
