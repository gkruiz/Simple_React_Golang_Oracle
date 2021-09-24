module.exports = {
user : process.env.NODE_ORACLEDB_USER || "root",

password : process.env.NODE_ORACLEDB_PASSWORD || "12345678",

connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521",

externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
