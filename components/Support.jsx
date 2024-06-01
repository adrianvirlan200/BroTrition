import Image from "next/image";

const SupportPage = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="font-bold text-3xl mb-4">Support</h1>
      <p className="mb-8">
        We have compiled all of our resources in one place so you find the help
        you need.
      </p>

      <div className="min-w-48 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/book.svg"
              width="40"
              height="40"
              alt="Manual"
            />
            <h2 className="font-bold text-lg">User Manual</h2>
          </div>
          <p className="mb-4">
            Complete app info with screenshots and step-by-step explanations of
            every feature.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            READ
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/video.svg"
              width="40"
              height="40"
              alt="Video Tutorials"
            />
            <h2 className="font-bold text-lg">Video Tutorials</h2>
          </div>
          <p className="mb-4">
            Our video tutorials series will teach you everything you need to
            know about our app.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            WATCH
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/phone.svg"
              width="40"
              height="40"
              alt="Contact"
            />
            <h2 className="font-bold text-lg">Contact Us</h2>
          </div>
          <p className="mb-4">
            Can’t find an answer to your question? Contact our support team for
            help.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            CONTACT US
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/location.svg"
              width="40"
              height="40"
              alt="Professional"
            />
            <h2 className="font-bold text-lg">Find a Professional</h2>
          </div>
          <p className="mb-4">
            Find a coach, nutritionist or trainer to help achieve your health
            and fitness goals.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            SEARCH
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/blog.svg"
              width="40"
              height="40"
              alt="Blog"
            />
            <h2 className="font-bold text-lg"> Brotrition Blog</h2>
          </div>
          <p className="mb-4">
            Check out our blog to stay up to date on all the latest news and
            updates.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            READ
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <div className="flex items-center mb-4">
            <Image
              src="/brotrition_assets/svg/forum.svg"
              width="40"
              height="40"
              alt="Forum"
            />
            <h2 className="font-bold text-lg">Community Forums</h2>
          </div>
          <p className="mb-4">
            Want to see how others are using Brotrition? Join the conversation
            on our forums.
          </p>
          <a href="#" className="text-blue-600 font-semibold">
            SAY HELLO
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
