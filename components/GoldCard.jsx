import { Button } from "@nextui-org/react";

const GoldCard = () => {
  return (
    <div className="shadow-md bg-white border-1 border-gray-300 mb-4 rounded-xl p-5">
      <h className="font-bold text-4xl">
        <span className="green_gradient">BroTrition </span>
        <span className="orange_gradient">Gold</span>
      </h>

      <div className="grid grid-cols-[3fr_1fr]">
        <div>
          <p className="text-base font-medium mt-1">
            Reach your goals faster with Gold!
          </p>

          <ul className="list-disc pl-5 mt-1">
            <li>No Ads!</li>
            <li>Exclusive Workout Plans</li>
            <li>Personalized Nutrition Advice</li>
            <li>Access to Expert Trainers</li>
            <li>Priority Customer Support</li>
          </ul>
        </div>

        <div className="">
          <p className="text-2xl font-bold line-through text-gray-400 ">
            12.49€ /month
          </p>
          <p className="text-2xl font-bold">9.49€ /month</p>

          <p className="italic text-xs">
            *Based on your current active discounts
          </p>

          <Button size="lg" color="warning" className="mt-5 font-bold">
            Subscribe now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoldCard;
