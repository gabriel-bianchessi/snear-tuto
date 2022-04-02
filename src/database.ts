import { createConnection } from "mysql2/promise"

// @todo: colocar o tipo correto
let connection: any = undefined

async function getConnection() {
  if (connection) { 
    return connection
  }
  connection = await createConnection({host: "localhost", user: "root", password: "123qwe!@#", database: "mydb"})
  return connection
}

export default getConnection  