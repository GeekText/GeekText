var mongoose = require("mongoose");

// Schema setup; MONGOO/MODEL/CONFIG
// To run type: mongo >> use restful_book_app >> db.books.find() 
var bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    bio: String,
    genre: String,
    publishedInfo: String,
    rating: String,
    bookAuthor:  String ,
    created: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model("Book", bookSchema);