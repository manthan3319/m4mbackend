/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../utilities/dbService");
const messages = require("../../utilities/messages");
const universal = require("../../utilities/universal");
const path = require("path");

/*************************** addContractor ***************************/
const addContractor = async (req) => {
  const { email, password } = req.body;

  let contractorData = await dbService.findOneRecord("contractorModel", {
    email: email,
  });

  if (contractorData) {
    throw new Error("Email Address Already Exists!");
  } else {
    const encryptedPassword = await universal.encryptpassword(password);
    const contractorDataToInsert = {
      ...req.body,
      password: encryptedPassword,
    };

    let project = await dbService.createOneRecord(
      "contractorModel",
      contractorDataToInsert
    );

    return "Data inserted";
  }
};

/*************************** adminLogin ***************************/
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required!" });
  }

  const data = {
    email: email,
    isDeleted: false,
  };

  try {
    let contractorData = await dbService.findOneRecord("contractorModel", data);

    if (contractorData) {
      const passwordsMatch = await universal.decryptPassword(
        password,
        contractorData.password
      );

      if (passwordsMatch) {
        const userIdObj = { userId: contractorData._id };
        const token = await universal.generateJwtTokenFn(userIdObj);

        // Prepare token data
        const tokenData = {
          userId: contractorData._id,
          token: token,
          createdAt: new Date(),
        };

        // Update or insert token data
        const upadterecode = await dbService.findOneAndUpdateRecord(
          "contractorModel",
          { _id: contractorData._id },
          { $push: { loginToken: tokenData } }, // Use $push to add token to the array
          { new: true } // Return the updated document
        );

        return {
          messages: "Login Successful!",
          token: token,
        };
      } else {
        return {
          messages: "Password is incorrect!",
          status: 400,
        };
      }
    } else {
      return {
        messages: "Your Email is incorrect!",
        status: 400,
      };
    }
  } catch (error) {
    console.error("Error in adminLogin:", error);
    throw new Error("An error occurred!");
  }
};

/*************************** AddCategory ***************************/
const AddCategory = async (req) => {
  try {
    const { categoryName, comingSoon } = req.body;
    const imageFile = req.file;

    if (!categoryName || !comingSoon || !imageFile) {
      throw new Error(
        "Missing required fields: categoryName, comingSoon, or imageFile"
      );
    }

    const finalImagePath = path.join(
      imageFile.destination,
      `processed_${Date.now()}_${imageFile.originalname}`
    );

    // Check if the category already exists
    const categoryData = await dbService.findOneRecord("CategoryModel", {
      categoryName,
    });

    if (categoryData) {
      return {
        success: false,
        message: "Category already exists",
      };
    } else {
      const data = {
        categoryName: categoryName,
        comingSoon: comingSoon,
        imageName: imageFile.originalname,
      };
      console.log("data", data);
      await dbService.createOneRecord("CategoryModel", data);
      return {
        success: true,
        message: "Category added successfully",
      };
    }
  } catch (error) {
    console.error("Error in AddCategory:", error.message);
    return {
      success: false,
      message: "Error adding category",
      error: error.message,
    };
  }
};

/*************************** getCategory ***************************/
const getCategory = async (req) => {
  let where = {
    isDeleted: false,
  };

  try {
    let data = await dbService.findAllRecords("CategoryModel", where);

    if (data && data.length > 0) {
      return {
        success: true,
        data: data,
        message: "Category data fetched successfully!",
      };
    } else {
      return {
        success: false,
        message: "No categories found or all categories are deleted.",
      };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: "Error fetching categories",
      error: error.message,
    };
  }
};

/*************************** categoryDelete ***************************/
const categoryDelete = async (req, res) => {
  try {
    console.log("categoryDelete", req.body);

    let { categoryId } = req.body;

    // Ensure that categoryId is provided
    if (!categoryId) {
      return {
        messages: "Category ID is required",
      };
    }

    let deleteData = await dbService.deleteOneRecord("CategoryModel", {
      _id: categoryId,
    });

    if (deleteData.deletedCount === 0) {
      return {
        messages: "Category not found",
      };
    }

    return {
      messages: "Category deleted successfully",
    };
  } catch (error) {
    return {
      messages: "An error occurred while deleting the category",
    };
  }
};

/*************************** updateCategory ***************************/
const updateCategory = async (req, res) => {
  const { categoryName, comingSoon } = req.body;
  const categoryId = req.body.categoryId;
  if (!categoryId) {
    return {
      message: "Category ID is required",
    };
  }

  try {
    const category = await dbService.findOneRecord("CategoryModel", {
      _id: categoryId,
    });
    if (!category) {
      return {
        message: "Category not found",
      };
    }

    // Determine image name
    let imageName = category.imageName; // Default to existing image
    if (req.file) {
      imageName = req.file.originalname; // Use new image if provided
    }

    const updateData = {
      categoryName,
      comingSoon,
      imageName,
    };
    // console.log("imageName:", imageName, ", updateData:", updateData);
    const updatedCategory = await dbService.findOneAndUpdateRecord(
      "CategoryModel",
      { _id: categoryId },
      updateData,
      { new: true }
    );

    if (updatedCategory) {
      return {
        message: "category Update successfully",
      };
    } else {
      return {
        message: "category Not Update successfully",
      };
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

/*************************** AddProduct ***************************/
const AddProduct = async (req, res) => {
  // console.log("AddProduct", req.body);
  const { productName, selectedCategory, price, mrp,selectedCategoryId } = req.body;
  const image = req.file;
  if (!productName || !selectedCategory || !price || !mrp || !image || !selectedCategoryId) {
    return {
      message: "required All fields",
    };
  }

  try {
    const data = {
      productName: productName,
      categoryName: selectedCategory,
      categoryid:selectedCategoryId,
      price: price,
      mrp: mrp,
      imageName: image.originalname,
    };

    const addProductData = await dbService.createOneRecord(
      "ProductModel",
      data
    );

    if (addProductData) {
      return {
        message: "Product added successfully",
      };
    } else {
      return {
        messages: "product Not Add",
      };
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

/*************************** getProduct ***************************/
const getProduct = async (req) => {
  let where = {
    isDeleted: false,
  };

  try {
    let data = await dbService.findAllRecords("ProductModel", where);

    if (data && data.length > 0) {
      return {
        success: true,
        data: data,
        message: "product data fetched successfully!",
      };
    } else {
      return {
        success: false,
        message: "No products found or all products are deleted.",
      };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      message: "Error fetching product",
      error: error.message,
    };
  }
};

/*************************** categoryDelete ***************************/
const productDelete = async (req, res) => {
  console.log("productDelete",req.body);
  try {

    let { productId } = req.body;

    // Ensure that product is provided
    if (!productId) {
      return {
        messages: "product ID is required",
      };
    }

    let deleteData = await dbService.deleteOneRecord("ProductModel", {
      _id: productId,
    });

    if (deleteData.deletedCount === 0) {
      return {
        messages: "product not found",
      };
    }

    return {
      messages: "product deleted successfully",
    };
  } catch (error) {
    return {
      messages: "An error occurred while deleting the product",
    };
  }
};

/*************************** categoryDelete ***************************/
const AddOurCulture = async (req) => {
  try {
    console.log("AddOurCulture", req.body);

    let imageRecords = [];

    for (const image of req.files) {
      const imageRecord = {
        imageName: image.originalname,
      };
      let result = await dbService.createOneRecord("ourCultureModel", imageRecord);

      imageRecords.push(result);
    }

    console.log("Saved image records:", imageRecords);

    return { message: 'Images uploaded successfully!', data: imageRecords };
  } catch (error) {
    console.error("Error in AddOurCulture:", error);
    throw new Error('Failed to upload images.');
  }
};

/*************************** getOurCulture ***************************/
const getOurCulture = async (req) => {
  let where = {
    isDeleted: false,
  };

  try {
    let data = await dbService.findAllRecords("ourCultureModel", where);

    if (data && data.length > 0) {
      return {
        success: true,
        data: data,
        message: "Our Culture data fetched successfully!",
      };
    } else {
      return {
        success: false,
        message: "No Our Culture found or all products are deleted.",
      };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      message: "Error fetching product",
      error: error.message,
    };
  }
};

/*************************** ourCultureDelete ***************************/
const ourCultureDelete = async (req, res) => {
  console.log("ourCultureDelete",req.body);
  try {

    let { ourCultureId } = req.body;

    // Ensure that product is provided
    if (!ourCultureId) {
      return {
        messages: "Our Culture ID is required",
      };
    }

    let deleteData = await dbService.deleteOneRecord("ourCultureModel", {
      _id: ourCultureId,
    });

    if (deleteData.deletedCount === 0) {
      return {
        messages: "Our culture not found",
      };
    }

    return {
      messages: "Our culture deleted successfully",
    };
  } catch (error) {
    return {
      messages: "An error occurred while deleting the product",
    };
  }
};

/*************************** AddBlog ***************************/
const AddBlog = async (req) => {
  const { Category, Content, Title } = req.body;
  const image = req.file;

  // Check if all required fields are present
  if (!Category || !Content || !image || !Title) {
    return {
      message: "All fields are required",
    };
  }

  try {
    const data = {
      Title: Title,
      Category: Category,
      Content: Content,
      imageName: image.originalname,
      createDate: new Date(),
    };

    const addProductData = await dbService.createOneRecord("blogModel", data);

    if (addProductData) {
      return {
        message: "Blog added successfully",
      };
    } else {
      return {
        message: "Blog not added",
      };
    }
  } catch (error) {
    console.error("Error adding blog:", error);
    return {
      message: "An error occurred while adding the blog",
    };
  }
};

/*************************** getBlog ***************************/
const getBlog = async (req) => {
  let where = {
    isDeleted: false,
  };

  try {
    let data = await dbService.findAllRecords("blogModel", where);

    if (data && data.length > 0) {
      return {
        success: true,
        data: data,
        message: "Blog data fetched successfully!",
      };
    } else {
      return {
        success: false,
        message: "No Blog found or all Blog are deleted.",
      };
    }
  } catch (error) {
    console.error("Error fetching Blog:", error);
    return {
      success: false,
      message: "Error fetching Blog",
      error: error.message,
    };
  }
};

/*************************** blogDelete ***************************/
const blogDelete = async (req, res) => {
  console.log("productDelete",req.body);
  try {

    let { blogId } = req.body;

    if (!blogId) {
      return {
        messages: "Blog ID is required",
      };
    }

    let deleteData = await dbService.deleteOneRecord("blogModel", {
      _id: blogId,
    });

    if (deleteData.deletedCount === 0) {
      return {
        messages: "Blog not found",
      };
    }

    return {
      messages: "Blog deleted successfully",
    };
  } catch (error) {
    return {
      messages: "An error occurred while deleting the Blog",
    };
  }
};

/*************************** AddBlog ***************************/
const AddAboutUs = async (req) => {
  const { Content } = req.body;
  const image = req.file;

  // Check if all required fields are present
  if (!Category || !Content || !image || !Title) {
    return {
      message: "All fields are required",
    };
  }

  try {
    const data = {
      Content: Content,
      imageName: image.originalname,
    };

    const addProductData = await dbService.createOneRecord("aboutusModel", data);

    if (addProductData) {
      return {
        message: "aboutus added successfully",
      };
    } else {
      return {
        message: "aboutus not added",
      };
    }
  } catch (error) {
    console.error("Error adding aboutus:", error);
    return {
      message: "An error occurred while adding the aboutus",
    };
  }
};




module.exports = {
  addContractor,
  adminLogin,
  AddCategory,
  getCategory,
  categoryDelete,
  updateCategory,
  AddProduct,
  getProduct,
  productDelete,
  AddOurCulture,
  getOurCulture,
  ourCultureDelete,
  AddBlog,
  getBlog,
  blogDelete,
  AddAboutUs
};
