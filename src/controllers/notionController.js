const { Client } = require('@notionhq/client')

let getDatabase = async(cmd) => {

    var now = new Date();

    let today = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
   
    const notion = new Client({
        auth: process.env.NOTION_TOKEN
    })
    const {results} = await notion.databases.query({
        database_id:"19aad614a49b4dd8b1cbf83cace5fd36"
    })
   
    let blockUrl = [];  
   

    for (i in results){
        if ( results[i].properties.날짜.date && results[i].properties.날짜.date.start == today ){
            blockUrl.push([results[i].url.replace('https://www.notion.so/',''),results[i].properties.이름.title[0].text.content])
        }
    }
    let toDoList = [];
    
    for (i in blockUrl){
        let whoToDolist = [blockUrl[i][1]];
        const {results} = await notion.blocks.children.list({
            block_id: blockUrl[i][0]
        })
        for (j in results){
            
            if(results[j].to_do && results[j].to_do.rich_text[0]){
            
                if(results[j].to_do.checked == true){
                    whoToDolist.push([results[j].to_do.rich_text[0].text.content,"[V]"])
                }
                if(results[j].to_do.checked == false){
                    whoToDolist.push([results[j].to_do.rich_text[0].text.content,"[  ]"])
                }        
            }
        }
        toDoList.push(whoToDolist);
    }
    
    let output = `** ${today} toDoList **`
    for (k in toDoList) {
        output += `\r\n\r\n ${toDoList[k][0]}`  
        for (j=1; toDoList[k].length > j; j++){
            output += `\r\n ${toDoList[k][j][1]}${toDoList[k][j][0]}`
    }
}
    output += `\r\n\r\n** 오늘도 화이팅:) **`

    return await output;
}


module.exports = {getDatabase}