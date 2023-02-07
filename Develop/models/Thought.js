const { Schema, model } = require('mongoose');
const {reactionSchema} = require('./Reaction')

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length:1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:function(){
        return new Date(this.createdAt).toISOString()
      }

    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
 
  {
    toJSON: {
      getters: true,
    },
  }
);
userSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
