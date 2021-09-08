'use strict';
window.onload = init;
let isMoving = false;
let addRow = false;
let selectedEntity;
let entitiesMap = new Map;
let selectedText;
let isStretching = false;
let currentPreviewLine;
function createSVGElement(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function init() {
    let addRowButton= document.getElementById("addRow");
    addRowButton.addEventListener("click" ,function (){
        selectedEntity.addRow();
    });
    let dragElements = document.querySelectorAll(".side-img");
    dragElements.forEach(element => element.addEventListener("mousedown", switchOnMoving));
    window.addEventListener("mousemove", moveImg);
    window.addEventListener("mouseup", switchOffMoving);
}

function createEntity(event) {
    let key = "entity-0";
    let position = getMousePosition(event);
    let entityNumber = 0;
    while (entitiesMap.has(key)) {
        entityNumber++;
        key = "entity-" + entityNumber;
    }
    let entityView = new EntityView(position.x, position.y, key);
    let entityBody = entityView.createBody();
    document.getElementById("svg-view").appendChild(entityBody);
    makeDraggable(entityBody);
    entitiesMap.set(key, entityView);
}

function createRelation(event,relationType) {
    let position = getMousePosition(event);
    let relationView = new RelationView(position.x, position.y,relationType, "relation-0");
    let relation = relationView.createBody();
    document.getElementById("svg-view").appendChild(relation);
    makeDraggable(relation);
}

function createPreviewLine(event) {
    let mousePos = getMousePosition(event)
    let previewLine = new PreviewLine(mousePos.x,mousePos.y)
    currentPreviewLine = previewLine.createBody(1)
    document.getElementById("svg-view").appendChild(currentPreviewLine);
    isStretching = true;
    window.addEventListener("mousemove",stretchLine)
    window.addEventListener("mouseup", switchOffStretching);
}








