const ProductSkeleton = () => {
  return (
    <div className="animate-pulse p-4  border border-gray-200">
      {/* Image skeleton */}
      <div className="bg-gray-200 h-70 w-full  mb-4"></div>

      {/* Title skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      {/* Price / Button skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-20"></div>
      </div>
    </div>
  );
};

const ProductLoaderSkaleton = () => {
  return (
    <main>
      <div className="w-[200px] h-6 bg-gray-200 mb-2"></div>
      <div className="w-[120px] h-4 bg-gray-200 mb-5"></div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
    </main>
  );
};

export default ProductLoaderSkaleton;