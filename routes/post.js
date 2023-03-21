const router = require("express").Router();
const {
  getAStory,
  getAllStories,
  getAStoryByUser,
  getAllStoriesByUser,
  createStory,
  deleteStory,
  updateStory,
} = require("../controller/post");

router.get("/all", getAllStories);
router.get("/all/:postId", getAStory);

router.route("/post").get(getAllStoriesByUser).post(createStory);
router
  .route("/post/:postId")
  .get(getAStoryByUser)
  .delete(deleteStory)
  .patch(updateStory);

module.exports = router;
