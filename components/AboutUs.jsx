const AboutUs = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="font-bold text-3xl mb-4">About</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-2xl mb-2">About Us</h2>
          <p className="text-base">
            We are dedicated to helping you achieve your health and fitness
            goals through our innovative platform that combines personalized
            nutrition advice, expert trainers, and a supportive community.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-2xl mb-2">Privacy</h2>
          <p className="text-base">
            Your privacy is important to us. We are committed to protecting your
            personal information and ensuring that your data is secure. Please
            review our privacy policy for more details.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-2xl mb-2">Terms of Services</h2>
          <p className="text-base">
            By using our platform, you agree to our terms of services. These
            terms outline the rules and regulations for using our services and
            ensure a positive experience for all users.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-2xl mb-2">Blog</h2>
          <p className="text-base">
            Our blog is your go-to source for the latest news, updates, and tips
            on health and fitness. Stay informed and inspired by reading our
            expert articles and success stories.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-2xl mb-2">Forums</h2>
          <p className="text-base">
            Join our community forums to connect with other users, share your
            experiences, ask questions, and get support from fellow fitness
            enthusiasts and experts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
