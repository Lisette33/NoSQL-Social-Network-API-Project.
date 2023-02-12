const { Schema, Types, model } = require('mongoose');

// Schema to create Username model
const userSchema = new Schema(
  {
    usernameId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      isEmail: true,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref:"Thought"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref:"User"
    }],
  },
  {
    toJSON: {
      getters: true,
    },
   id: false,
  }
);
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});
const User=model("User",userSchema);
module.exports = User;
