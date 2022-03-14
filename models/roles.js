const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  role: {
    type: "string",
    required: [true, "role is required"],
  },
});

module.exports = model("Roles", RoleSchema);
