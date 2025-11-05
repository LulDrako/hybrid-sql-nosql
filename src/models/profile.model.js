const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
    ref: "User"
  },
  preferences: {
    genres: [String],
    authors: [String]
  },
  history: [{
    bookTitle: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

