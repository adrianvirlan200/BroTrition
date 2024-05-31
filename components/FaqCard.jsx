const FAQCard = () => {
  return (
    <div className="bg-white border-1 border-gray-300 mb-4 rounded-xl p-5">
      <h className="font-bold text-4xl mb-6">Why BroTrition Gold?</h>
      <p className="text-lg mb-4">Frequently Asked Questions</p>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-lg">What is BroTrition Gold?</h2>
          <p className="text-base mt-2">
            BroTrition Gold is our premium membership that offers exclusive
            benefits like no ads, personalized nutrition advice, access to
            expert trainers, and more.
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-lg">
            How can I subscribe to BroTrition Gold?
          </h2>
          <p className="text-base mt-2">
            You can subscribe to BroTrition Gold through our website or mobile
            app by navigating to the subscription section and choosing the Gold
            plan.
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-lg">
            Can I unsubscribe from BroTrition Gold at any time?
          </h2>
          <p className="text-base mt-2">
            Yes, you can unsubscribe from BroTrition Gold at any time through
            your account settings. Simply go to the subscription section and
            choose to cancel your membership.
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-lg">
            What are the payment options for BroTrition Gold?
          </h2>
          <p className="text-base mt-2">
            We accept various payment methods including credit/debit cards,
            PayPal, and other popular payment gateways.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
