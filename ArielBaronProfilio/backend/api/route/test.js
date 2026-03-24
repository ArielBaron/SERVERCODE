const express = require('express');
const router = express.Router();
const {test, test2,test3, test4} = require("../controller/test");
router.get("/items",test);
router.get("/:d", test2);
router.get("/", test3);
router.post("/t",test4);



module.exports = router;