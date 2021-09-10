class Entity{
   rows =[];

    constructor(tableName) {
        this.tableName = tableName;
    }
   addRow(entityRow){
       let row = {
           key: entityRow.key,
           name: entityRow.name,
           type: entityRow.type
       }
       this.rows.push(row)
   }
}