import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const categories = {
  Men: ["Topwear", "Bottomwear", "Winterwear"],
  Women: ["Topwear", "Bottomwear", "Winterwear"],
  Kids: ["Topwear", "Bottomwear", "Winterwear"],
};


const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProductForm = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSizes((prev) =>
      checked ? [...prev, value] : prev.filter((size) => size !== value)
    );
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setImages(newImages);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubcategory("");
    setSizes([]);
    setBestSeller(false);
    setImages([null, null, null, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("bestSeller", bestSeller);

    sizes.forEach((size, idx) => {
      formData.append(`sizes[${idx}]`, size);
    });

    images.forEach((imgObj, idx) => {
      if (imgObj && imgObj.file) {
        formData.append(`Image${idx + 1}`, imgObj.file);
      }
    });

    try {
      const res = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/product/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success("Product created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white w-full rounded-lg overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
            disabled={!category}
          >
            <option value="">Select Subcategory</option>
            {category &&
              categories[category].map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
          </select>

          <div>
            <label className="block text-gray-700 mb-1">Sizes:</label>
            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <label
                  key={size}
                  className="flex items-center space-x-1 text-gray-600"
                >
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={bestSeller}
              onChange={(e) => setBestSeller(e.target.checked)}
              className="h-5 w-5"
            />
            <label className="text-gray-700">Best Seller</label>
          </div>
        </div>

        {/* Right Column: Image Upload */}
        <div>
          <p className="mb-3 font-medium text-gray-700">Upload Images</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {images.map((img, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                  {img && img.preview ? (
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Upload size={24} />
                      <span className="text-sm">Upload</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(index, e)}
                  />
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
