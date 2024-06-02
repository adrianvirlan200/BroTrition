const TipsAndTricks = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-1">Tips and Tricks</h1>
      <p>
        When choosing a gym, it's important to consider various factors to
        ensure it meets your needs and preferences.
      </p>
      <p>Here are some tips to help you make the best choice.</p>

      <div className="min-w-48 grid grid-cols-1 gap-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Location
          </h2>
          <p className="mb-4">
            Choose a gym that is conveniently located near your home or
            workplace. This will make it easier to incorporate workouts into
            your daily routine.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Operating Hours
          </h2>
          <p className="mb-4">
            Ensure the gym's operating hours align with your schedule. Some gyms
            are open 24/7, while others have more restricted hours.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Equipment and Facilities
          </h2>
          <p className="mb-4">
            Check if the gym has the equipment and facilities that you need,
            such as free weights, machines, cardio equipment, a swimming pool,
            or a sauna.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Cleanliness
          </h2>
          <p className="mb-4">
            Visit the gym and assess the cleanliness of the facilities. A clean
            gym is crucial for your health and well-being.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Membership Fees
          </h2>
          <p className="mb-4">
            Compare membership fees and check if there are any hidden costs.
            Some gyms offer discounts for long-term commitments or have
            promotional rates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Classes and Programs
          </h2>
          <p className="mb-4">
            If you enjoy group workouts, look for gyms that offer a variety of
            classes and programs such as yoga, spinning, or HIIT.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Trainers and Staff
          </h2>
          <p className="mb-4">
            The quality and availability of trainers and staff can significantly
            impact your gym experience. Look for gyms with knowledgeable and
            friendly staff.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-1 border-gray-300">
          <h2 className="font-bold text-lg mb-4 border-b-1 border-gray-300 w-64">
            Member Reviews
          </h2>
          <p className="mb-4">
            Read reviews from current and past members to get an idea of their
            experiences. This can provide insights into the gym's atmosphere and
            quality of service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipsAndTricks;
