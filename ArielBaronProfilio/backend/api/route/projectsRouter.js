const express = require('express');
const router = express.Router();
const { addProject, getProjects, deleteProject, createProject } = require("../controller/projectsController");
const { authenticateToken } = require("../middleWare"); // your JWT auth middleware

//public
router.delete('/delete/:email/:projName', deleteProject);
router.get("/", getProjects)

// need Auth token
router.post("/add", authenticateToken,addProject)
router.post("/create",authenticateToken,createProject)
module.exports = router;
