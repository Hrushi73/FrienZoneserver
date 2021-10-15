const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  const connection = `${process.env.DATABASE}`;
  await mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));
}
const postSchema = new mongoose.Schema({
  image: String,
  description: String,
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  timeStamp: Date,
  Comments: [
    {
      comment: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", postSchema);
