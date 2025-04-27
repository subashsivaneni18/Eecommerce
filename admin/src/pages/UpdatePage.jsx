import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import useSWR from "swr";
import LeftBar from "../components/LeftBar";

const categories = {
  Men: ["Topwear", "Bottomwear", "Winterwear"],
  Women: ["Topwear", "Bottomwear", "Winterwear"],
  Kids: ["Topwear", "Bottomwear", "Winterwear"],
};

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  const { data: product } = useSWR(
    `${VITE_BACKEND_HOST_URL}/api/product/single/${id}`,
    async (url) => {
      const res = await axios.get(url);
      return res.data;
    }
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setSubcategory(product.subcategory || "");
      setSizes(product.sizes || []);
      setBestSeller(product.bestSeller || false);
      setImage(product.image || []);
    }
  }, [product]);

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSizes((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
      setImage((prev) => [...prev, res.data.url]);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed!");
    }
  };

  const handleImageDelete = (url) => {
    setImage((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      category,
      subcategory,
      sizes,
      bestSeller,
      image, // correct field
    };

    try {
      await axios.put(
        `${VITE_BACKEND_HOST_URL}/api/product/update/${id}`,
        updatedProduct,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white border-r shadow-sm">
        <LeftBar />
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Update Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                rows="4"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-5">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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
                <label className="block text-gray-700 mb-1 font-medium">
                  Sizes:
                </label>
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
                <label className="text-gray-700 font-medium">Best Seller</label>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Product Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {image.map((img, i) => (
                    <div key={i} className="relative w-24 h-24">
                      <img
                        src={img}
                        alt="Product"
                        className="w-full h-full object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(img)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="cursor-pointer inline-flex items-center space-x-2 text-sm font-medium text-green-700">
                    <Upload size={18} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-md transition hover:bg-green-700"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
