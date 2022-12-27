const database = require("./dataSource");


const saveChat = async(name,content) =>{

    return await database.query(
        `INSERT INTO
        chat (name, content)
        VALUES(?,?)
        `,
        [name, content]
    )
}

module.exports = 
{   saveChat
  };