import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import content from "./data/content.json";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./api/products";
import ProductCard from "./pages/ProductListPage/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const size = 10;

  useEffect(() => {
    const loadProducts = async () => {
      setError(null);
      try {
        const response = await getAllProducts(page, size, "createdAt,desc");
        setProducts(response.data);
        setTotal(response.total);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Failed to load products:", err.message);
      }
    };
    loadProducts();
  }, [page]);

  // Handle pagination
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setPage((prev) => (prev < Math.ceil(total / size) - 1 ? prev + 1 : prev));

  return (
    <>
      <HeroSection />
      <div className="flex-1 p-10 mx-10">
        <h1 className="text-black text-lg mb-4 ">ALL PRODUCTS</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {!error && products.length === 0 && (
          <p className="text-gray-600">No products found.</p>
        )}

        {!error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item, index) => (
              <ProductCard
                key={item.id + "_" + index}
                id={item.id}
                title={item.name}
                description={item.description}
                price={item.price}
                discount={item.discountPercentage}
                rating={item.rating}
                brand={item.brand}
                thumbnail={item.thumbnail}
                slug={item.slug}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page + 1} of {Math.ceil(total / size)}
            </span>
            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(total / size) - 1}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer content={content?.footer} />
    </>
  );
};

export default Shop;
