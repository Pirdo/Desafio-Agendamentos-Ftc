async function connect() {
    //confirma se está conectado com a variavel global
    if (global.connection && global.connection.state != "disconnected") {
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        "mysql://root:789888999@localhost:3306/agendamento"
    );
    console.log("Conectou no MySQL");
    global.connection = connection;
    return connection;
}
module.exports = { connect };
