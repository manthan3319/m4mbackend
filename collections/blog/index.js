/**
 * This is the indexer for contractor model
 * @author Sandip Vaghasiya
 * @since Saturday, May 28, 2022
 */

const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  Category: { type: String },
  Title: { type: String },
  Content: { type: String },
  productName: { type: String },
  imageName: { type: String },
  price: { type: String },
  createDate: { type: String },
  mrp: { type: String },
  email: { type: String },
  password: { type: String },
  micsConNotes: { type: String },
  address2: { type: String },
  loginToken: [
    {
      token: {
        type: String,
      },
    },
  ],
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  country: { type: String },
  empIdentiNumber: { type: String },
  licenseInfo: { type: String },
  insureanceInfo: { type: String },
  bondInfo: { type: String },
  mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Number,
  isUpdated: Boolean,
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("blog", contractorSchema);
