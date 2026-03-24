const items = require("../model/test.js");
module.exports= {
    test: async (req , res) => {
        return res.status(200).json(items);
    },
    test2: async (req,res) => {
        const d = req.params;
        return res.status(200).json({"msg":d})
    },
    test3: async (req,res) => {
        const d = req.query;
        return res.status(200).json({"msg":d})
    },
    test4: async (req,res) => {
        const d = req.body;
        return res.status(200).json({"msg":d})
    }


    


}