const router = require("express").Router();

const Actions = require("./data/helpers/actionModel");
const Projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(400).json({ message: "Database Error" });
    });
});

module.exports = router;
