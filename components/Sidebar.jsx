// components/Sidebar.js
import { useState } from "react";
import { Button, Card } from "@nextui-org/react";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button auto onPress={toggleSidebar}>
        Toggle Sidebar
      </Button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transform transition-transform ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        <Card css={{ height: "100%" }}>
          <Card.Body>
            <div className="flex flex-col h-full p-4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <a href="#" className="mb-2">
                Home
              </a>
              <a href="#" className="mb-2">
                About
              </a>
              <a href="#" className="mb-2">
                Services
              </a>
              <a href="#" className="mb-2">
                Contact
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Sidebar;
