import Map from "@components/Map";
import TipsAndTricks from "@components/TipsAndTricks";

const Gym = () => {
  return (
    <div className="p-4">
      <h className="text-3xl font-semibold mb-1">Gyms Nearby</h>
      <p className="text-xl mb-3">Find gyms near your current location </p>

      <div className="bg-white mb-8 h-96 p-2 border-1 border-gray-300 rounded-2xl shadow-md">
        <Map />
      </div>

      <TipsAndTricks />
    </div>
  );
};

export default Gym;
