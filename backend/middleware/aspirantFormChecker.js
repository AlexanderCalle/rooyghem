const fs = require('fs');

module.exports = (req, res, next) => {
    const data = req.body;
    if (data.firstname && data.lastname) {
        next();
    } else {
        res.status(400).json({error: "Vul alles in!"});
        if (req.file) {fs.unlinkSync(process.env.ASPIRANT_PATH + req.file.filename)}
    }
}