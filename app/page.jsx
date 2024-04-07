import executeQuery from "./api/mysqldb.jsx";
import SignIn from "@components/SignIn.jsx"; // Path: app/page.jsx6+9`+9`
import Image from "next/image";

const first_page = async () => {
  const query = "SELECT * FROM test";
  const result = await executeQuery(query, []);

  return (
    <section>
      <div className="grid grid-cols-1 divide-y">
        <SignIn />
      </div>
    </section>
  );
};

export default first_page;
