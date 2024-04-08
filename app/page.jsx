import executeQuery from "./api/mysqldb.jsx";
import WelcomePage from "@components/WelcomePage.jsx"; // Path: app/page.jsx6+9`+9`
import Image from "next/image";

const first_page = async () => {
  const query = "SELECT * FROM test";
  const result = await executeQuery(query, []);

  return (
    <div>
      <div className="p-5">
        <WelcomePage />
      </div>
    </div>
  );
};

export default first_page;
