import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/ProductModel.js";





const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, bestSeller } =
      req.body;

    // Convert sizes to array if they came as object
    let sizes = [];
    if (req.body.sizes) {
      if (Array.isArray(req.body.sizes)) {
        sizes = req.body.sizes;
      } else if (typeof req.body.sizes === "object") {
        sizes = Object.values(req.body.sizes);
      } else {
        sizes = [req.body.sizes]; // single size
      }
    }

    // Safely access uploaded images
    const image1 = req.files.Image1 && req.files.Image1[0];
    const image2 = req.files.Image2 && req.files.Image2[0];
    const image3 = req.files.Image3 && req.files.Image3[0];
    const image4 = req.files.Image4 && req.files.Image4[0];

    const images = [image1, image2, image3, image4].filter(Boolean);
    console.log(images,'images')

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = new productModel({
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      date: Date.now(),
      bestSeller: bestSeller === "true",
      image: imageUrls,
    });
    console.log(imageUrls, "imageUrls")

    await productData.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: productData,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const ListofProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json(products)
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const DeleteProduct = async (req, res) => {
   try {
    const {id} = req.body;

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await productModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

   } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
   }
};

const SingleProduct = async (req, res) => {
   try {
     const {id} = req.params
     const product = await productModel.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.json(product)
     return res.json({})
   } catch (error) {
     console.log(error)
     res.status(500).json({
       success: false,
       message: "Internal server error",
     });
   }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestSeller,
    } = req.body;

    // Find product by id
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update sizes (convert to array if needed)
    let updatedSizes = Array.isArray(sizes) ? sizes : [sizes];

    // Handle image upload
    const imageFiles = [];
    if (req.files) {
      const imageKeys = Object.keys(req.files); // Get all uploaded image fields (e.g. Image1, Image2)
      imageKeys.forEach((key) => {
        if (req.files[key]) {
          imageFiles.push(req.files[key][0]); // Push only the first image if multiple are uploaded for each field
        }
      });
    }

    // Upload images to Cloudinary if any
    const imageUrls =
      imageFiles.length > 0
        ? await Promise.all(
            imageFiles.map(async (image) => {
              const result = await cloudinary.uploader.upload(image.path, {
                resource_type: "image",
              });
              return result.secure_url;
            })
          )
        : [];

    // Merge existing images with new images (if any)
    const updatedImageUrls = [...product.image, ...imageUrls];

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.sizes = updatedSizes || product.sizes;
    product.bestSeller =
      bestSeller !== undefined ? bestSeller : product.bestSeller;
    product.image = updatedImageUrls;

    // Save the updated product
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


 

export { createProduct, ListofProducts, DeleteProduct, SingleProduct,updateProduct };
