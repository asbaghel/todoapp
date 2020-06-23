const express = require("express");

const router = express.Router();

const Post = require("../../modles/Post");

//Get all the post
router.get("/", (req, res, next) => {
  Post.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
});

//create a post
router.post("/add", (req, res, next) => {
  console.log(`this is request `, req.body);

  const title = req.body.title;
  const completed = req.body.completed;
  let newPost = new Post({
    title: title,
    completed: completed
  });
  newPost
    .save()
    .then(post => {
      res.json(post);
    })
    .catch(err => console.log(err));
});

router.put("/update/:id", (req, res, next) => {
  console.log(`this is request  of put`, req.body);
  let id = req.params.id;
  Post.findById(id)
    .then(post => {
      post.title = req.body.title;
      post.completed = req.body.completed;

      post
        .save()
        .then(post => {
          res.send({
            message: "post updated succesfully ",
            status: "success",
            post: post
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  Post.findById(id)
    .then(post => {
      post
        .delete()

        .then(post => {
          res.send({
            message: "post deleted succesfully ",
            status: "success",
            post: post
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
module.exports = router;
