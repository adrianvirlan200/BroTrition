import Sidebar from "@components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="invisible md:visible">
        <Sidebar />
      </div>
      <div className="md:ml-60 p-5 mx-auto md:w-[calc(100vw-290px)]">
        {children}
      </div>
    </div>
  );
};

export default layout;
