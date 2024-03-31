import "@styles/globals.css";

export const metadata = {
  title: "Layout",
  description: "Layout component",
};

const RootLayout = ({ children }) => {
  return (
    <html eng="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
