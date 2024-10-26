/*
 * @file: index.js
 * @description: It's combine all contractor routers.
 * @author: Manthan Vaghasiya
 */

const save = require("./save");
const list = require("./list");
const edit = require("./edit");
const single = require("./single");
const deleteOne = require("./delete");
const adminLogin = require("./adminLogin");
const AddCategory = require("./AddCategory");
const getCategory = require("./getCategory");
const categoryDelete = require("./categoryDelete");
const updateCategory = require("./updateCategory");
const AddProduct = require("./AddProduct");
const getProduct = require("./getProduct");
const productDelete = require("./productDelete");
const AddOurCulture = require("./AddOurCulture");
const getOurCulture = require("./getOurCulture");
const ourCultureDelete = require("./ourCultureDelete");
const AddBlog = require("./AddBlog");
const getBlog = require("./getBlog");
const blogDelete = require("./blogDelete");
const AddAboutUs = require("./AddAboutUs");
const getDetails = require("./getDetails");
const getAboutus = require("./getAboutus");
const updateBlog = require("./updateBlog");
const addChatBoxQue = require("./addChatBoxQue");
const getChatBoxQueList = require("./getChatBoxQueList");
const chatBoxQuestionDelete = require("./chatBoxQuestionDelete");
const AddShopLocation = require("./AddShopLocation");
const getShopLocationList = require("./getShopLocationList");
const deleteShopLocation = require("./deleteShopLocation");
const updateShopLocation = require("./updateShopLocation");

module.exports = [
  deleteShopLocation,
  updateShopLocation,
  getShopLocationList,
  AddShopLocation,
  chatBoxQuestionDelete,
  getChatBoxQueList,
  addChatBoxQue,
  updateBlog,
  save,
  list,
  edit,
  single,
  deleteOne,
  adminLogin,
  AddCategory,
  getCategory,
  updateCategory,
  categoryDelete,
  AddProduct,
  getProduct,
  productDelete,
  AddOurCulture,
  getOurCulture,
  ourCultureDelete,
  AddBlog,
  getBlog,
  blogDelete,
  AddAboutUs,
  getDetails,
  getAboutus
];
