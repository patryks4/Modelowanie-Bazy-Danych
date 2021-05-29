class EntityView {

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
        const keyEnd = this.x + 50;
        const typeStart = this.x +150;
        const startX = this.x;
        const startY = this.y + this.rowHeight;
        namesRow.appendChild(this.createHorizontalLine(startX, startY, this.width))
        namesRow.classList.add("entity-name");
        namesRow.appendChild(this.textElement(startX + 50,startY,"Table Name"));
        return namesRow;
    }

    textElement(x, y, text) {
        let textField = createSVGElement("text");
        textField.setAttribute("x",x);
        textField.setAttribute("y",y-5);
        textField.textContent = text;
        textField.classList.add("entity-text")
        return textField;
    }

    createHorizontalLine(x,y,width){
        let line = createSVGElement("line");
        line.setAttribute("x1",x);
        line.setAttribute("y1",y);
        line.setAttribute("x2",x+width);
        line.setAttribute("y2",y);
        line.classList.add("entity");
        return line;

    }
    createVerticalLine(x,y, height){
        let line = createSVGElement("line");
        line.setAttribute("x1",x);
        line.setAttribute("y1",y);
        line.setAttribute("x2",x);
        line.setAttribute("y2", y - height);
        line.classList.add("entity");
        return line;
    }

    addRow() {
        let tableHeight = this.tableBorder.getAttribute("height");
        tableHeight = parseInt(tableHeight) + this.rowHeight;
        this.tableBorder.setAttribute("height", tableHeight)
    }
}