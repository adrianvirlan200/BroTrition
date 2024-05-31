import Image from "next/image";

const Coupon = () => {
  return (
    <div className="shadow-md border-1 border-gray-300 mb-4 flex rounded-lg p-3 bg-gradient-to-r from-blue-200 to-blue-300">
      <Image
        src="/brotrition_assets/svg/discount.svg"
        width="70"
        height="70"
        className="mr-7"
      />
      <div>
        <h1 className="text-2xl font-bold">Discount: 25%</h1>
        <p className="text-xl font-medium">25% off your first year!</p>
        <p className="italic">This Discount apply only for new customers.</p>
      </div>
    </div>
  );
};

export default Coupon;
