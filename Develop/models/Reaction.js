const { Schema } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      
    },
    reactionBody: {
      type: String,
      required: true,
      max_lenth: 280,

    },
    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:function(){
          return new Date(this.createdAt).toISOString()
        }
  
      },
    },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = {Reaction,reactionSchema};
