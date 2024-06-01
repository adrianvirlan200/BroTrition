import Sidebar from "@components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="lg:ml-60 p-5 mx-auto lg:w-[calc(100vw-290px)]">
        {children}
      </div>
    </div>
  );
};

export default layout;
