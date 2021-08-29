class EntityView {
    textType = {entityName: "name",
        key:"key",
        attrName: "attr-name",
        attrType:"attr-type",

    }
    constructor(x, y, tableId) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.rowHeight =25;
        this.tableBorder = createSVGElement("rect");
        this.entityInfo = new EntityInfo(tableId, 1);
    }

    createBody() {
        let entityGroup = createSVGElement("g");
        entityGroup.id = this.entityInfo.entityViewId;
        entityGroup.classList.add("draggable");
        this.entityInfo.numberOfRows =1;
        entityGroup.addEventListener("click",  (event) => {
            addRow = true;
            if (event.target.parentNode.hasAttribute("id")) {
               selectedEntity = entitiesMap.get(event.target.parentNode.id)
            }
            else {
                selectedEntity = entitiesMap.get(event.target.parentNode.parentNode.id);
            }
        });
        let entityName = this.createNamesRow();
        entityGroup.appendChild(this.createBorder());
        entityGroup.appendChild(entityName);
        entityGroup.appendChild(this.createTextRow())
        return entityGroup;

    }

    createBorder(){
        const startX = this.x;
        const startY = this.y;
        const width =this.width;
        const height = this.rowHeight * 2;
        const border = this.tableBorder;
        border.setAttribute("x", startX);
        border.setAttribute("y", startY);
        border.setAttribute("width", width);
        border.setAttribute("height", height);
        border.classList.add("entity");
        border.classList.add("draggable");

        return border;
    }

    createNamesRow() {
        let namesRow = createSVGElement("g");
        const startX = this.x;
        const startY = this.y + this.rowHeight;
        namesRow.appendChild(createHorizontalLine(startX, startY, this.width))
        namesRow.classList.add("entity-name");
        namesRow.appendChild(this.textElement(startX + 50,startY,this.textType.entityName));
        return namesRow;
    }

    createTextRow() {
        const startY = this.y + parseInt(this.tableBorder.getAttribute("height"));
        const startX = this.x + 5;
        const nameStart = this.x + 40;
        const typeStart = this.x + 150;
        let textRow = createSVGElement("g");
        textRow.appendChild(this.textElement(startX, startY, this.textType.key));
        textRow.appendChild(this.textElement(nameStart, startY,this.textType.attrName));
        textRow.appendChild(this.textElement(typeStart, startY,this.textType.attrType));
        return textRow;
    }

    textElement(x, y, type) {
        let text;
        if (this.entityInfo.numberOfRows === 1 && type==="key") {
            text = "PK";
        }
        else
        {
            switch (type){
                case 'name':
                    text = "Table Name";
                    break;
                case 'key':
                    text = "+";
                    break;
                case 'attr-name':
                    text = "name";
                    console.log("name");
                    break;
                case 'attr-type':
                    text = "type";
                    break;
            }
        }

        let textField = createSVGElement("text");
        textField.id = this.entityInfo.entityViewId + "-" + type + "-" + (this.entityInfo.numberOfRows -1);
        textField.setAttribute("x",x);
        textField.setAttribute("y",y-5);
        textField.textContent = text;
        textField.classList.add("entity-text");
        textField.addEventListener('dblclick', addEditField);

        return textField;
    }


    addRow() {
        let tableHeight = this.tableBorder.getAttribute("height");
        this.entityInfo.numberOfRows++;
        tableHeight = parseInt(tableHeight) + this.rowHeight;
        this.tableBorder.setAttribute("height", tableHeight);
         document.getElementById(this.entityInfo.entityViewId).appendChild(this.createTextRow());
    }


}