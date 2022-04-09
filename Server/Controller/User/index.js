
const pool = require('../../Config/index.js')
const {generateAccessToken} = require('../../Config/token')


// const http = require('http');

// function parseCookies (request) {
//     const list = {};
//     const cookieHeader = request.headers?.cookie;
//     if (!cookieHeader) return list;

//     cookieHeader.split(`;`).forEach(function(cookie) {
//         let [ name, ...rest] = cookie.split(`=`);
//         name = name?.trim();
//         if (!name) return;
//         const value = rest.join(`=`).trim();
//         if (!value) return;
//         list[name] = decodeURIComponent(value);
//     });

//     return list;
// }

const sortByName =(arr, name='name') =>{
    try{
        if(Array.isArray(arr)){
            return arr.sort((a,b) => (a[name] > b[name]) ? 1 : ((b[name] > a[name]) ? -1 : 0))
        }
        return []
    }catch(err){
        return []
    }
}

class User {
    constructor() {
    }

    async register(req, res){
        let conn;
        try{
            const {body} = req;
            conn = await pool.getConnection();
            const userRow = await conn.query(`select id, name, email, role from user where email='${body.email}'`)
            if(userRow && userRow.length > 0){
                res.send({
                    "error" : true,
                    "message" : "Email Id Already Exist"
                })
            }else{
                const row = await conn.query(`INSERT  INTO user (name, email, password, role) values('${body.name}', '${body.email}', '${body.password}','${body.role}')`)
                if(row && row.affectedRows > 0){
                    res.send({
                        "error" : false,
                        "message" : "Registration Successfull"
                    })
                }else{
                    res.send({
                        "error" : true,
                        "message" : "Something went wrong !! Please try again"
                    })
                }
            }
            
            
        }catch(err){
            res.send({
                "error" : true,
                "message" : err
            })
        }
        finally{
            conn.end()
        }
    }
    async login(req, res){
        let conn;
        try{
            const {body} = req;
            conn = await pool.getConnection();
            const row = await conn.query(`select id, name, email, role from user where email='${body.email}' and password='${body.password}'`)
            // const row = await conn.query(`select id, name, email, role from user where email='$1' and password=$2`, [body.email, body.password])
            if(row && row.length > 0){
                res.send({
                    "error" : false,
                    "message" : "Login Successfully",
                    "data" : row,
                    'token' : generateAccessToken(row[0])
                })
            }else{
                res.send({
                    "error" : true,
                    "message" : "Email and Password not matching !! Please try again"
                })
            }
            
        }catch(err){
            res.send({
                "error" : true,
                "message" : err
            })
        }finally{
            conn.end()
        }
    }

    async getUsers(req, res) {
        let conn;
        try{
            conn = await pool.getConnection();
            if(req.user.role == 'EMPLOYEE'){
                res.send({
                    "error" : false,
                    "message" : "Data Retrived Successfully",
                    "data" : [req.user],
                    "type" : "EMPLOYEE"
                })
            }else if(req.user.role == 'ADMIN'){
                const row = await conn.query('select * from user')
                res.send({
                    "error" : false,
                    "message" : "Data Retrived Successfully",
                    "data" : sortByName(row, 'name'),
                    "type" : "ADMIN"
                })
            }
            
        }catch(err){
            res.send({
                "error" : true,
                "message" : "Something went wrong"
            })
        }finally{
            conn.end()
        }
    }
    
    async getUser(req, res){
        let conn;
        try{
            const {query} = req;
            const id = query.id;
            if(id){
                conn = await pool.getConnection();
                const row = await conn.query(`select id, name, email, role from user where id='${id}'`);
                res.send({
                    "error" : false,
                    "message" : "Data Retrived Successfully",
                    "data" : row
                })
            }else{
                res.send({
                    "error" : true,
                    "message" : "Something went wrong"
                })
            }
            
        }catch(err){
            res.send({
                "error" : true,
                "message" : "Something went wrong"
            })
        }finally{
            conn.end()
        }
    }
}


module.exports = User;