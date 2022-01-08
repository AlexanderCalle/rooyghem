const fs = require('fs');

module.exports = (req, res, next) => {
    const data = req.body;
    if (data.name && data.description && data.price) {
        next();
    } else {
        res.status(400).json({error: "Vul alles in"});
        if(req.file) {fs.unlinkSync(process.env.TOKSHOP_ITEMS_PATH_PIC + req.file.filename)}
    }
}