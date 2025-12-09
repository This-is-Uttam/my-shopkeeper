import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        About <span className="text-blue-600">{process.env.NEXT_PUBLIC_APP_NAME}</span>
      </h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        {process.env.NEXT_PUBLIC_APP_NAME} is a modern e-commerce platform created to make online shopping
        simple, trustworthy, and enjoyable for everyone. We focus on providing
        high-quality products, fast shipping, and a smooth shopping experience.
      </p>

      {/* Main section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/godown.png"
            alt="godown"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-7 mb-6">
            Our mission is to bridge the gap between quality and affordability.
            We work directly with manufacturers and trusted suppliers to bring 
            you premium products at the best prices possible.
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3 text-slate-300 leading-7 list-disc list-inside">
            <li>Wide range of products across multiple categories</li>
            <li>Secure & fast checkout process</li>
            <li>24/7 customer support</li>
            <li>Reliable shipping and easy returns</li>
            <li>Genuine quality with warranty</li>
          </ul>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-20">
        <h2 className="text-center text-3xl font-semibold text-gray-900 mb-10">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-linear-to-r  from-blue-600 to-blue-400 shadow-md rounded-xl text-center text-white">
            <h3 className="text-xl font-bold mb-2">Trust</h3>
            <p className="text-slate-300">
              We ensure 100% transparency in every product and service we offer.
            </p>
          </div>

         

          <div className="p-6 bg-gradient-to-r  from-blue-600 to-blue-400 shadow-md rounded-xl text-center text-white">
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-slate-300">
              Only premium products make it to our store after quality checks.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r  from-blue-600 to-blue-400 shadow-md rounded-xl text-center text-white">
            <h3 className="text-xl font-bold mb-2">Customer First</h3>
            <p className="text-slate-300">
              Your satisfaction is at the heart of everything we do.
            </p>
          </div>

          

        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is here to assist you anytime.
        </p>

        <a
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-slate-text-slate-300"
        >
          Contact Us
        </a>
      </div>

    </div>
  );
}
