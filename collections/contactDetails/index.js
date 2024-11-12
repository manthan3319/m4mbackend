const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  role: { type: String },   
  name: { type: String,  },   
  address: { type: String,  },   
  contact: { type: String,  }, 
  createdAt: { type: Date, default: Date.now },  
  updatedAt: { type: Date },  
  isEnabled: { type: Boolean, default: true },  
});

module.exports = mongoose.model('ContactDetails', contactSchema);
