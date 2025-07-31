import about from '/images/about.png'



export default function About() {
  return (
    <section className="relative min-h-[80vh] flex justify-center items-center">
      <img className='absolute -z-100 w-full h-full object-cover' src={about} alt="" />
      <div className='container md:w-2/3 backdrop-blur-2xl py-10 rounded-lg'>
        <h1 className='text-3xl font-medium my-4 text_hl'>About Roomitude</h1>
        <p>At Roomitude, we believe great chairs make great spaces. We're passionate about blending timeless craftsmanship with modern aesthetics to create pieces that bring comfort and style into your everyday life.

          Whether you're outfitting a cozy corner or designing a full interior, our curated collection helps you find the perfect seating solutions. Built to last. Designed to inspire.</p>
      </div>
    </section>
  );
}
