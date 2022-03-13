const query = require("./query");
const config = require("./config");

module.exports = {
    get: async (req, res)=>{
        let page = Number(req.body.page);
        let type = Number(req.body.type);
        if (isNaN(page) || isNaN(type)){
            res.json({status: "error"});
        }
        let typeinfo;
        switch (type){
            case 1:typeinfo = "time";break;
            case 2:typeinfo = "money";break;
            default:typeinfo = "time";break;
        }
        let pagenum = (page-1)*20;
        let dbinfo = await query(`SELECT * FROM record ORDER BY ${typeinfo} DESC LIMIT ?,20`, [pagenum]);
        res.json(dbinfo);
    },
    add: async (req, res)=>{
        if (req.body.token == config.token){
            let username = req.body.username;
            let avatar = req.body.avatar;
            let money = req.body.money;
            let time = req.body.time;
            if (username != "" && avatar != "" && money != "" && time != ""){
                await query("INSERT INTO record (`username`, `avatar`, `money`, `time`) VALUES (?, ?, ?, ?)", [username, avatar, money, time])
                res.json({status: "ok"})
            }else{
                res.json({status: "form_error"})
            }
        }else{
            res.json({status: "token_error"})
        }
    }
}