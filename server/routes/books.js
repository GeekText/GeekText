// ROUTES books.js
var express = require("express");
var router  = express.Router();
var Book    = require("../api/models/book");
var config    = require("../../config");

// var middleware = require("../middleware")


// /*
// ===============================
// INDEX: Show all the books.
// =============================== */
// router.get("/", function(req, res){
//     // Get all books from DB
//     Book.find({}, function(err, allBooks){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("books/index", {books:allBooks});
//       }
//     });
// });


/*
========================================
CREATE - Add new books into the db.
======================================== */
router.post("/" , function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var genre = req.body.genre;
    var bookAuthor = req.body.bookAuthor;
    var publishedInfo = req.body.publishedInfo;
    var rating = req.body.rating;
    var bio = req.body.bio;
    var author = {
        // id: req.user._id, 
        // username: req.user.username
    };
    var newBook ={ name : name, 
                   image: image, 
                   description: desc, 
                   author: author, 
                   genre: genre, 
                   bookAuthor: bookAuthor, 
                   publishedInfo: publishedInfo,
                   rating: rating,
                   bio: bio };
    // Create a new book and save to DB
    Book.create(newBook, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to book page
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});



/*
===============================================
NEW - Shows the form to create a new book
=============================================== */
router.get("/new", function(req, res){
  res.render("books/new", 
  {content: 'Loading New Book Page'}); 
});



/*
============================================
SHOW - shows additional book details.
============================================ */
router.get("/:id", function(req, res){
    //find the book with provided ID
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            console.log(foundBook)
            //render show template with that book
            res.render("books/show", {
                content: 'Loading Show Page',
                userID: config.usersObjectId, 
                book: foundBook});
        }
    });
});



/*
============================================
EDIT BOOKS ROUTE
============================================ */
router.get("/:id/edit",  function(req, res){
        Book.findById(req.params.id, function(err, foundBook){
            res.render("books/edit", {
                content: 'Loading Edit Page',
                book: foundBook});
        });
});



/*
============================================
UPDATE BOOK ROUTE
============================================ */
router.put("/:id", function(req, res){
    // res.send("TESTING: UPDATE ROUTE!" );
    // req.body.book.body = req.sanitize(req.body.book.body);
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/" + req.params.id);
        }
    });
});



/*
============================================
DESTROY ROUTE
============================================ */
router.delete("/:id", function(req, res){
    // res.send("We have succesfully deleted the book.");
    // destroy the book
    Book.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/books");
        }else{
            res.redirect("/books");
        }
    });
});


module.exports = router;

