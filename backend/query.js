const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_database,
    port: config.db_port
})

let query = (sql, values)=>{
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            }else{
                connection.query(sql, values, ( err, rows) => {
                    if (err){
                        reject( err )
                    }else{
                        resolve( rows )
                    }
                    connection.release();
                })
            }
        })
    })
}

module.exports = query;