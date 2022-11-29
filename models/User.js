const { Schema, model } = require("mongoose");

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
  },
  {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
userSchema.virtual("firendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
