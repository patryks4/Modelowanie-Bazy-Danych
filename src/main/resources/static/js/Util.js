function getMousePosition(event) {
    let svg = document.getElementById("svg-view");
    let CTM = svg.getScreenCTM();
    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    };
}

function addEditField(event) {
    console.log("edit field");
    console.log(event.target.id);
    selectedText = document.getElementById(event.target.id);
    let tDiv = document.createElement("div");
    tDiv.setAttribute("id", "edit-text");
    tDiv.setAttribute("contenteditable", "true");
    tDiv.classList.add("edit-field");
    tDiv.style.left=(event.pageX -50)+"px";
    tDiv.style.top=(event.pageY-12)+"px";
    document.getElementsByTagName("body")[0].appendChild(tDiv);
    window.addEventListener("click", switchText);

}

function switchText(event) {
    let textEditDiv = document.getElementById('edit-text');
    if (event.target.id !== textEditDiv.id)
    {
        selectedText.textContent = textEditDiv.textContent;
        textEditDiv.parentNode.removeChild(textEditDiv);
        window.removeEventListener('click', switchText);
    }

}
function createHorizontalLine(x,y,width){
    let line = createSVGElement("line");
    line.setAttribute("x1",x);
    line.setAttribute("y1",y);
    line.setAttribute("x2",x+width);
    line.setAttribute("y2",y);
    line.classList.add("line");
    return line;
}
function createVerticalLine(x,y, height){
    let line = createSVGElement("line");
    line.setAttribute("x1",x);
    line.setAttribute("y1",y);
    line.setAttribute("x2",x);
    line.setAttribute("y2", y - height);
    line.classList.add("line");
    return line;
}

function createDiagonalLine(x1,y1,x2,y2){
    let line = createSVGElement("line");
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2", y2);
    line.classList.add("line");
    return line;
}

function getDataFromEntities() {
    let entitiesData = [];
    for (let value of entitiesMap.values()) {
        console.log(value.entityInfo.entityViewId)
       let entity = getDataFromEntityView(value.entityInfo.entityViewId,Number.parseInt(value.entityInfo.numberOfRows))
        console.log(entity)
        entitiesData.push(entity)
    }
    let relationsList = setTableNameInRelation()
    let schema = {
        entities: entitiesData,
        relations: relationsList
    }
    console.log(schema)
    console.log(JSON.stringify(schema))
    sendSchema(schema)
}
function getDataFromEntityView(viewId,numberOfRows){
    let tableName =  getTableName(viewId)
    let entity =  new Entity(tableName)
    for (let i = 0; i < numberOfRows; i++) {
        entity.addRow(getTableRow(viewId,i))
    }
    return entity;
}

function getTableName(viewId) {
    return document.getElementById(viewId+"-name-0").textContent
}

function getTableRow(viewId,rowNumber){
    let entityKey;
    if (document.getElementById(viewId + "-key-" + rowNumber).textContent === "PK") {
        entityKey = true;
    }else {
        entityKey = false;
    }

    return{
        key: entityKey,
        name: document.getElementById(viewId + "-attr-name-" + rowNumber).textContent,
        type: document.getElementById(viewId + "-attr-type-" + rowNumber).textContent
    }
}

function sendSchema (schema) {
    let send = new XMLHttpRequest();
    send.open('POST', '/test/schema', true);
    send.setRequestHeader("Content-Type", "application/json");
    send.send(JSON.stringify(schema));
    send.onload = function () {
        if(send.status )
        {
            console.log(send.responseText) ;
            createWindowWithSQL(send.responseText)

        }
    };
}

function setTableNameInRelation() {
    let relationsList = mapToArray(relations)
    for (let relation of relationsList) {
        relation.leftSideTable =  getTableName(relation.leftSide);
        relation.rightSideTable =  getTableName(relation.rightSide);
    }
    return relationsList
}

function createWindowWithSQL(sql) {
    let sqlWindow = document.getElementById("sqlScript");
    sqlWindow.classList.remove("hidden");
    let content = document.createElement("p");
    content.textContent = sql;
    sqlWindow.appendChild(content)
    
}
