import Coupon from "@components/Coupon";
import GoldCard from "@components/GoldCard";
import FAQCard from "@components/FaqCard";

const Gold = () => {
  return (
    <div className="m-4 h-fit min-w-96">
      <h1 className="mb-4 text-3xl font-bold rounded-lg">
        Try out the Premium Version!
      </h1>
      <Coupon />
      <GoldCard />
      <FAQCard />
    </div>
  );
};

export default Gold;
