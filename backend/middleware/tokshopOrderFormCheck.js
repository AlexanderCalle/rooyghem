module.exports = (req, res, next) => {
    console.log("in middleware");
    const data = req.body;
    if (data.email && data.firstname && data.lastname && data.group_id && data.items) {
        if (data.items.length > 0) {
            for (var item in data.items) {
                if (!item.tokshopitem_id || !item.amount) {
                    console.log("Bad item");
                    return res.status(400).json({error: "item " + item.toString() + " niet geldig."})
                }
            }
        } else {
            console.log("no items");
            return res.status(400).json({error: "Minstens 1 item is nodig"});
        }
    } else {
        console.log("Bad object: ");
        console.log(data.email);
        console.log(data.firstname);
        console.log(data.lastname);
        console.log(data.group_id);
        console.log(data.items);
        return res.status(400).json({error: "Vul alles in"});
    }
    console.log("ok");
    next();
}