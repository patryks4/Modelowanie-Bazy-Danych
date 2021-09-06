class RelationView{
    constructor(x, y,relationType, relationId) {
        this.x = x;
        this.y = y;
        this.relationType = relationType;
        this.relationId = relationId;
    }

    createBody() {
        let relationGroup = createSVGElement("g");
        let editableStroke = this.createEditStroke(15,30, 180, 60)
        let movingField = createSVGElement('rect');
        movingField.setAttribute("x", this.x -10);
        movingField.setAttribute("y", this.y - 25);
        movingField.setAttribute("width", 170);
        movingField.setAttribute("height", 50);
        movingField.classList.add("draggable");
        movingField.classList.add("moving-field");
        relationGroup.classList.add("draggable");
        relationGroup.appendChild(editableStroke)
        relationGroup.appendChild(movingField);
        switch (this.relationType){
            case "oto":
                relationGroup.appendChild(this.relationOtO())
                break;
            case "otm":
                relationGroup.appendChild(this.relationOtM())
                break;
            case "mtm":
                relationGroup.appendChild(this.relationMtM())
                break;
        }
        return relationGroup;
    }

    createEditStroke(offSetX, offSetY, width, height){
        let editStrokeGroup = createSVGElement("g");
        let editStroke = createSVGElement('rect');
        editStroke.setAttribute("x", this.x -offSetX);
        editStroke.setAttribute("y", this.y - offSetY);
        editStroke.setAttribute("width", width);
        editStroke.setAttribute("height", height);
        editStrokeGroup.classList.add("editable-stroke");
        editStrokeGroup.appendChild(editStroke)
        return editStrokeGroup;
    }
    relationOtO() {
        let relationOneToOne = createSVGElement("g");
        let line = createHorizontalLine(this.x,this.y,150);
        line.classList.add("draggable");
        let verticalLeftLine=createVerticalLine(this.x+10, this.y +15, 30);
        let verticalRightLine = createVerticalLine(this.x + 140, this.y + 15, 30);
        verticalLeftLine.classList.add("draggable");
        verticalRightLine.classList.add("draggable");
        relationOneToOne.appendChild(line);
        relationOneToOne.appendChild(verticalLeftLine);
        relationOneToOne.appendChild(verticalRightLine);
        return relationOneToOne;
    }
    relationOtM() {
        let relationOneToMany = createSVGElement("g");
        let line = createHorizontalLine(this.x,this.y,150);
        line.classList.add("draggable");
        let verticalLeftLine=createVerticalLine(this.x+10, this.y +15, 30);
        let verticalRightTopLine = createDiagonalLine(this.x + 130, this.y, this.x +145, this.y - 12);
        let verticalRightBottomLine = createDiagonalLine(this.x + 130, this.y, this.x +145, this.y + 12);
        verticalLeftLine.classList.add("draggable");
        verticalRightTopLine.classList.add("draggable");
        relationOneToMany.appendChild(line);
        relationOneToMany.appendChild(verticalLeftLine);
        relationOneToMany.appendChild(verticalRightTopLine);
        relationOneToMany.appendChild(verticalRightBottomLine)
        return relationOneToMany;
    }
    relationMtM() {
        let relationManyToMany = createSVGElement("g");
        let line = createHorizontalLine(this.x,this.y,150);
        let verticalLeftTopLine = createDiagonalLine(this.x + 15, this.y, this.x, this.y - 12);
        let verticalLeftBottomLine = createDiagonalLine(this.x + 15, this.y, this.x, this.y + 12);
        let verticalRightTopLine = createDiagonalLine(this.x + 135, this.y, this.x +150, this.y - 12);
        let verticalRightBottomLine = createDiagonalLine(this.x + 135, this.y, this.x +150, this.y + 12);
        relationManyToMany.appendChild(line);
        relationManyToMany.appendChild(verticalLeftTopLine);
        relationManyToMany.appendChild(verticalLeftBottomLine);
        relationManyToMany.appendChild(verticalRightTopLine);
        relationManyToMany.appendChild(verticalRightBottomLine);
        return relationManyToMany;
    }

}