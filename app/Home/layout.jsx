import Sidebar from "@components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 mt-4 w-[calc(100vw-290px)]">{children}</div>
    </div>
  );
};

export default layout;
