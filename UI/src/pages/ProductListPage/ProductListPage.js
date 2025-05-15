import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import FilterIcon from "../../components/common/FilterIcon";
import Categories from "../../components/Filters/Categories";
import PriceFilter from "../../components/Filters/PriceFilter";
import ColorsFilter from "../../components/Filters/ColorsFilter";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../api/products";
import { fetchCategoryById } from "../../api/categories";

// Dữ liệu tĩnh cho bộ lọc (khi API không cung cấp meta_data)
const staticFilterData = {
  types: [
    { id: "1", name: "Áo nam", code: "T_SHIRT" },
    { id: "2", name: "Quần Jeans", code: "JEANS" },
    { id: "3", name: "Phụ kiện", code: "ACCESSORIES" },
    { id: "4", name: "Đầm/Váy", code: "DRESS" },
  ],
  colors: ["Red", "Blue", "Black", "White", "Purple", "Yellow"],
  sizes: ["S", "M", "L", "XL", "XXL"],
};

const ProductListPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const categoryData = useSelector((state) => state?.categoryState?.categories);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const size = 10;

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryById(id);
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err.message);
        setError("Failed to load categories. Please try again.");
      }
    };
    loadCategories();
  }, [id]);

  // Find category and categoryType
  // const category = categories.find(cat => cat.code === categoryCode);
  // const categoryType = category && typeCode ? category.categoryTypes?.find(type => type.code === typeCode) : null;

  // Filter data for UI (use API meta_data if available, else static)
  const filterData = {};
  const filterTypes = filterData.categoryTypes?.length
    ? filterData.categoryTypes
    : staticFilterData.types;
  const filterColors = filterData.meta_data?.colors?.length
    ? filterData.meta_data.colors
    : staticFilterData.colors;
  const filterSizes = filterData.meta_data?.sizes?.length
    ? filterData.meta_data.sizes
    : staticFilterData.sizes;

  useEffect(() => {
    const loadProducts = async () => {
      setError(null);
      try {
        const response = await getAllProducts(
          page,
          size,
          "createdAt,desc",
          "",
          id
        );
        setProducts(response.data);
        setTotal(response.total);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Failed to load products:", err.message);
      } 
    
    };
    loadProducts();
  }, [page, id]);

  // Handle pagination
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setPage((prev) => (prev < Math.ceil(total / size) - 1 ? prev + 1 : prev));

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-[20%] p-4 border rounded-lg m-4">
          {/* Filters (hardcoded, display-only) */}
          <div className="flex justify-between items-center">
            <p className="text-[16px] text-gray-600">Filter</p>
            <FilterIcon />
          </div>
          <div>
            {/* Product types */}
            <p className="text-[16px] text-black mt-5">Categories</p>
            <Categories types={filterTypes} />
            <hr className="my-4" />
          </div>
          {/* Price */}
          <PriceFilter />
          <hr className="my-4" />
          {/* Colors */}
          <ColorsFilter colors={filterColors} />
          <hr className="my-4" />
          {/* Sizes */}
          <SizeFilter sizes={filterSizes} hideTitle={false} />
        </div>

        <div className="flex-1 p-4">
          {/* <p className="text-black text-lg mb-4">
                        {categoryType?.name || category?.name || 'Products'}
                    </p> */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

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
      </div>
    </div>
  );
};

export default ProductListPage;
