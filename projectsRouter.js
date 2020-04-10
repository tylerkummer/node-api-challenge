const router = require("express").Router();

const Actions = require("./data/helpers/actionModel");
const Projects = require("./data/helpers/projectModel");

// GET projects
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

// GET projects by id
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// GET project actions
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

// POST project
router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// Post action
router.post("/:id/actions", validateProjectId, (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// DELETE project
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// Delete action
router.delete("/:id/actions/:action_id", validateProjectId, (req, res) => {
  Actions.remove(req.params.action_id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// PUT project
router.put("/:id", validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// PUT action
router.put("/:id/actions/:action_id", validateProjectId, (req, res) => {
  Actions.update(req.params.action_id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Database Error" });
    });
});

// Middlware function
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
      console.log(error);
      res.status(500).json({ error: "Database error" });
    });
}

module.exports = router;
