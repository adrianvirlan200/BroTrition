import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import TopNav from "@components/TopNav";

export const metadata = {
  title: "BroTrition",
  description:
    "BroTrition is a web application that helps you track your daily nutrition intake. It provides you with a list of foods and their nutritional values. You can add the foods you eat to your daily log and track your daily nutrition intake. You can also set your daily nutrition goals and track your progress. BroTrition is a simple and easy-to-use application that helps you stay healthy and fi",
};

const RootLayout = ({ children }) => {
  return (
    <html eng="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <TopNav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
