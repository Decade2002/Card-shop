import mysql from 'mysql'
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0911947299Aa",
  database: 'yugioh'
});
export default con