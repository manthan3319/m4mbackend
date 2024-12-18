/**
 * This is the indexer for contractor model
 * @author Manthan Vaghasiya
 * @since Saturday, May 28, 2022
 */

const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  shopName: { type: String },
  description: { type: String },
  address: { type: String },
  number: { type: String },
  answers: { type: [String] },
  mapsLink: { type: String },
  price: { type: String },
  mapsgallery: { type: String },
  imageNames: { type: [String] },
  videoName: { type: String },
  createDate: { type: String },
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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Number,
  isUpdated: Boolean,
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("shopLocations", contractorSchema);
