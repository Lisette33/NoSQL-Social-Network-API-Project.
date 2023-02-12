const { Schema, model } = require('mongoose');
const {reactionSchema} = require('./Reaction')

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // minlength:1,
      // maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:function(date){
        return new Date(date).toISOString()
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
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
