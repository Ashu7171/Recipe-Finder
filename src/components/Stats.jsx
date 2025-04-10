import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <section className="py-14 w-full px-6 bg-purple-50">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">
        We Power Your Kitchen With Numbers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        <div>
          <h3 className="text-4xl font-bold text-purple-700">
            <CountUp end={2600} duration={2} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2">Ingredients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-purple-700">
            <CountUp end={5000} duration={2.5} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2">Recipes</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-purple-700">
            <CountUp end={600000} duration={3} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2">Products</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-purple-700">
            <CountUp end={115000} duration={2.5} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2">Menu Items</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
