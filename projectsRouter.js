const router = require("express").Router();

const Actions = require("./data/helpers/actionModel");
const Projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Database Error" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(400).json({ message: "invalid project id" });
      } else {
        req.project = project;
        next();
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Database error" });
    });
}

module.exports = router;
