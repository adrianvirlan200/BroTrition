import React from "react";

const Footer = () => {
  return (
    <footer className="pt-3 pb-5 w-screen h-fit relative inset-x-0 bottom-0 mt-4 bg-zinc-800 border-black">
      <div className="flex-col w-full mx-auto px-5 flex content-center justify-between">
        <span className="m-4 text-white text-center text-xl">
          © 2024{" "}
          <a href="http://localhost:3000/" className="hover:underline">
            BroTrition™
          </a>
          . All Rights Reserved.
        </span>

        <div className="sm:mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/About"
            className="mx-auto hover:underline text-white text-l"
          >
            About
          </a>
          <a
            href="/About"
            className="mx-auto hover:underline text-white text-l"
          >
            Privacy Policy
          </a>
          <a
            href="/About"
            className="mx-auto hover:underline text-white text-l"
          >
            Licensing
          </a>
          <a
            href="/Support"
            className="mx-auto hover:underline text-white text-l"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
