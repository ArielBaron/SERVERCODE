const { client } = require('../model/db');
const jwt = require('jsonwebtoken');
module.exports = {
  // Add a new project for a user
  addProject: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // expects "Bearer <token>"

    if (!token) return res.status(401).json({ error: "Token required" });
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET); // verifies signature and expiration
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    const email = payload.email;
    const {
      progLang,
      projName,
      description,
      region,
      contributors,
      diffcultyRange,
      wantDesign,
      wantServerHosting,
      wantMarketing,
      wantCodeCleanup,
    } = req.body;

    // Basic validation
    if (
      !email ||
      !progLang ||
      !projName ||
      !region ||
      wantDesign === undefined ||
      wantServerHosting === undefined ||
      wantMarketing === undefined ||
      wantCodeCleanup === undefined
    ) {
      return res.status(400).json("Required fields missing");
    }

    try {
      // Check if project already exists for this user + projName (primary key)
      const existing = await client.execute({
        sql: `SELECT * FROM user_projects WHERE email = ? AND projName = ?`,
        args: [email, projName],
      });

      if (existing.rows.length > 0) {
        return res.status(409).json("Can't have more than one project with the same name for the user");
      }

      await client.execute({
        sql: `INSERT INTO user_projects
          (email, progLang, projName, description, region, contributors, diffcultyRange, wantDesign, wantServerHosting, wantMarketing, wantCodeCleanup)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          email,
          progLang,
          projName,
          description || null,
          region,
          contributors || null,
          diffcultyRange || null,
          wantDesign ? 1 : 0,
          wantServerHosting ? 1 : 0,
          wantMarketing ? 1 : 0,
          wantCodeCleanup ? 1 : 0,
        ],
      });

      return res.status(201).json("Project added successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  createProject: async (req, res) => {
    const {
      email,
      progLang,
      projName,
      description,
      region,
      contributors,
      diffcultyRange,
      wantDesign,
      wantServerHosting,
      wantMarketing,
      wantCodeCleanup,
    } = req.body;

    // Basic validation
    if (
      !email ||
      !progLang ||
      !projName ||
      !region ||
      wantDesign === undefined ||
      wantServerHosting === undefined ||
      wantMarketing === undefined ||
      wantCodeCleanup === undefined
    ) {
      return res.status(400).json("Required fields missing");
    }

    try {
      // Check if project already exists for this user + projName (primary key)
      const existing = await client.execute({
        sql: `SELECT * FROM user_projects WHERE email = ? AND projName = ?`,
        args: [email, projName],
      });

      if (existing.rows.length > 0) {
        return res.status(409).json("Can't have more than one project with the same name for the user");
      }

      await client.execute({
        sql: `INSERT INTO user_projects
          (email, progLang, projName, description, region, contributors, diffcultyRange, wantDesign, wantServerHosting, wantMarketing, wantCodeCleanup)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          email,
          progLang,
          projName,
          description || null,
          region,
          contributors || null,
          diffcultyRange || null,
          wantDesign ? 1 : 0,
          wantServerHosting ? 1 : 0,
          wantMarketing ? 1 : 0,
          wantCodeCleanup ? 1 : 0,
        ],
      });

      return res.status(201).json("Project added successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },


  // Delete a specific project of a user
  deleteProject: async (req, res) => {
    const { email, projName } = req.params;
    if (!email || !projName) {
      return res.status(400).json("Email and project name are required");
    }
    const existing = await client.execute({
      sql: `SELECT * FROM user_projects WHERE email = ? AND projName = ?`,
      args: [email, projName],
    });

    if (existing.rows.length == 0) {
      return res.status(409).json("couldnt find project");
    }

    try {
      await client.execute({
        sql: `DELETE FROM user_projects WHERE email = ? AND projName = ?`,
        args: [email, projName],
      });
      return res.status(200).json("Project deleted successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getProjects: async (req, res) => {
    const {
      projName,
      email,
      region,
      progLang,
      diffcultyRange,
      wantDesign,
      wantServerHosting,
      wantMarketing,
      wantCodeCleanup,
    } = req.query;

    try {
      let query = `SELECT * FROM user_projects WHERE 1=1`;
      const args = [];

      if (projName) {
        query += ` AND projName = ?`;
        args.push(projName);
      }
      if (email) {
        query += ` AND email = ?`;
        args.push(email);
      }

      if (region) {
        query += ` AND region = ?`;
        args.push(region);
      }

      if (progLang) {
        query += ` AND progLang = ?`;
        args.push(progLang);
      }

      if (diffcultyRange) {
        query += ` AND diffcultyRange = ?`;
        args.push(diffcultyRange);
      }

      if (wantDesign !== undefined) {
        query += ` AND wantDesign = ?`;
        args.push(wantDesign === 'true' ? 1 : 0);
      }

      if (wantServerHosting !== undefined) {
        query += ` AND wantServerHosting = ?`;
        args.push(wantServerHosting === 'true' ? 1 : 0);
      }

      if (wantMarketing !== undefined) {
        query += ` AND wantMarketing = ?`;
        args.push(wantMarketing === 'true' ? 1 : 0);
      }

      if (wantCodeCleanup !== undefined) {
        query += ` AND wantCodeCleanup = ?`;
        args.push(wantCodeCleanup === 'true' ? 1 : 0);
      }

      const result = await client.execute({ sql: query, args });
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

};
