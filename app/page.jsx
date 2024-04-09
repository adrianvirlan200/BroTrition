import WelcomePage from "@components/WelcomePage.jsx"; // Path: app/page.jsx6+9`+9`
import Image from "next/image";

const first_page = async () => {
  return (
    <div>
      <div className="p-5">
        <WelcomePage />
      </div>
    </div>
  );
};

export default first_page;
