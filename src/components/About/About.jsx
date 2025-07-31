export default function About() {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Roomitude
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            At Roomitude, we believe great chairs make great spaces. We're passionate about blending timeless craftsmanship with modern aesthetics to create pieces that bring comfort and style into your everyday life.
          </p>
          <p className="text-gray-500">
            Whether you're outfitting a cozy corner or designing a full interior, our curated collection helps you find the perfect seating solutions. Built to last. Designed to inspire.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="/images/about-chair.jpg"
            alt="About Roomitude"
            className="rounded-2xl shadow-lg w-full object-cover h-[300px] md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
