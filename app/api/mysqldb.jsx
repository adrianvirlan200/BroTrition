import mysql from "mysql2/promise";

const executeQuery = async (query, data) => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      database: "brotrition",
      user: "root",
      password: "",
    });
    const [result] = await db.execute(query, data);

    await db.end();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default executeQuery;
