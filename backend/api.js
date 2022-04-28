const query = require("./query");
const config = require("./config");

module.exports = {
    get: async (req, res) => {
        let page = Number(req.body.page);
        let type = Number(req.body.type);
        if (isNaN(page) || isNaN(type)) {
            res.json({ status: "error" });
        }
        let typeinfo;
        switch (type) {
            case 1: typeinfo = "time"; break;
            case 2: typeinfo = "hkd"; break;
            default: typeinfo = "time"; break;
        }
        let pagenum = (page - 1) * 20;
        let count = await query("SELECT count(id) as num FROM record");
        let dbinfo = await query(`SELECT * FROM record ORDER BY ${typeinfo} DESC LIMIT ?,20`, [pagenum]);
        let money_type = await query(`SELECT * FROM money`);
        let money_table = {};
        for (let i in money_type) {
            money_table[money_type[i].id] = money_type[i];
        }
        for (let i in dbinfo) {
            dbinfo[i].money = money_table[dbinfo[i].type]["format"].replace("123", dbinfo[i].money / 100);
        }
        res.json({ data: dbinfo, count: count[0].num });
    },
    add: async (req, res) => {
        if (req.body.token == config.token) {
            let username = req.body.username;
            let avatar = req.body.avatar;
            let money = req.body.money;
            let type = req.body.type;
            let time = req.body.time;
            if (username != "" && avatar != "" && money != "" && time != "") {
                let h = await query("SELECT * FROM money WHERE `id`=?", [Number(type)]);
                await query("INSERT INTO record (`username`, `avatar`, `money`, `type`, `hkd`, `time`) VALUES (?, ?, ?, ?, ?, ?)", [username, avatar, Number(money) * 100, type, ((Number(money) * 100) * h[0].tohkd) / 100, time])
                res.json({ status: "ok" })
            } else {
                res.json({ status: "form_error" })
            }
        } else {
            res.json({ status: "token_error" })
        }
    }
}