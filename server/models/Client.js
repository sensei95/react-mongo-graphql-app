const mongoose = require("mongoose");
const { ProjectSchema } = require("./Project");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  projects: {
    type: [ProjectSchema],
  },
});

module.exports = mongoose.model("Client", ClientSchema);
