import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "../../api/products";
import { fileUploadAPI } from "../../api/fileUpload";
import CategoryTypeInput from "./components/CategoryTypeInput";
import { colorSelector } from "./components/ColorsFilter";
import { sizeSelector } from "./components/SizeFilter";
import { fetchCategories } from "../../api/categories";

const CDN_URL = "http://localhost:8081";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    brand: "",
    categoryId: "",
    categoryTypeId: "",
    thumbnail: null,
    variants: [{ color: "", size: "", stockQuantity: 0 }],
    productResources: [
      { name: "", url: null, type: "image", isPrimary: false },
    ],
    rating: 0,
    newArrival: false,
  });
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [existingResources, setExistingResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData.data || []);

        if (isEdit) {
          const product = await getProductById(id);
          setFormData({
            ...product,
            thumbnail: null,
            variants: product.variants || [
              { color: "", size: "", stockQuantity: 0 },
            ],
            productResources: product.productResources || [
              { name: "", url: null, type: "image", isPrimary: false },
            ],
          });
          setExistingThumbnail(product.thumbnail || "");
          setExistingResources(product.productResources || []);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, [id, isEdit]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []); // Không phụ thuộc, hàm ổn định

  const handleArrayChange = useCallback((index, field, arrayName, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index][field] = value;
      return {
        ...prev,
        [arrayName]: updatedArray,
      };
    });
  }, []);

  const addArrayItem = useCallback((arrayName, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem],
    }));
  }, []);

  const removeArrayItem = useCallback((index, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  }, []);

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedResources = [...formData[field]];
    updatedResources[index] = {
      ...updatedResources[index],
      url: file, // Lưu File object vào url
      preview: URL.createObjectURL(file), // Tạo preview để hiển thị
    };

    setFormData({
      ...formData,
      [field]: updatedResources,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let requestBody = { ...formData };

      // Handle product resources upload
      const newProductResList = await Promise.all(
        formData.productResources.map(async (resource, index) => {
            if (resource.url instanceof File) {
                // Nếu là File object: Upload file mới
                const uploadResponse = await fileUploadAPI(resource.url, 'products');
                return {
                    ...resource,
                    url: CDN_URL + uploadResponse, // Lưu dưới dạng string
                    preview: undefined // Xóa blob URL preview
                };        
            }
            // Nếu là URL string: Giữ nguyên hoặc dùng existingResources
            return resource.url ? resource : existingResources[index] || resource;
        })
      );
      requestBody.productResources = newProductResList;

      if (isEdit) {
        await updateProduct(id, requestBody);
      } else {
        await createProduct(requestBody);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <CategoryTypeInput
          categoryId={formData.categoryId}
          value={formData.categoryTypeId}
          onChange={(value) =>
            setFormData({ ...formData, categoryTypeId: value })
          }
        />

        <div>
          <label className="block">Variants</label>
          {formData.variants.map((variant, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                value={variant.color}
                onChange={(e) =>
                  handleArrayChange(index, "color", "variants", e.target.value)
                }
                className="border p-2 rounded"
                required
              >
                <option value="">Select Color</option>
                {colorSelector.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
              <select
                value={variant.size}
                onChange={(e) =>
                  handleArrayChange(index, "size", "variants", e.target.value)
                }
                className="border p-2 rounded"
                required
              >
                <option value="">Select Size</option>
                {sizeSelector.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={variant.stockQuantity}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "stockQuantity",
                    "variants",
                    parseInt(e.target.value)
                  )
                }
                className="border p-2 rounded w-24"
                min="0"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "variants")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("variants", {
                color: "",
                size: "",
                stockQuantity: 0,
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Variant
          </button>
        </div>
        <div>
          <label className="block">Product Resources</label>
          {formData.productResources.map((resource, index) => (
            <div key={index} className="flex space-x-2 mb-2 items-center">
              <input
                type="text"
                value={resource.name}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "name",
                    "productResources",
                    e.target.value
                  )
                }
                className="border p-2 rounded"
                placeholder="Resource Name"
                required
              />

              {/* Hiển thị preview hoặc ảnh hiện tại */}
              {resource.preview ? (
                <img
                  src={resource.preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover"
                />
              ) : existingResources[index]?.url ? (
                <img
                  src={existingResources[index].url}
                  alt={resource.name}
                  className="w-16 h-16 object-cover"
                />
              ) : null}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index, "productResources")}
                className="border p-2 rounded"
                required={!isEdit || !existingResources[index]?.url}
              />

              <select
                value={resource.type}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "type",
                    "productResources",
                    e.target.value
                  )
                }
                className="border p-2 rounded"
                required
              >
                <option value="image">Image</option>
              </select>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={resource.isPrimary}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "isPrimary",
                      "productResources",
                      e.target.checked
                    )
                  }
                  className="mr-1"
                />
                <label>Primary</label>
              </div>

              <button
                type="button"
                onClick={() => removeArrayItem(index, "productResources")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("productResources", {
                name: "",
                url: null,
                type: "image",
                isPrimary: false,
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Resource
          </button>
        </div>
        <div>
          <label className="block">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            min="0"
            max="5"
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="newArrival"
              checked={formData.newArrival}
              onChange={handleInputChange}
              className="mr-2"
            />
            New Arrival
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
