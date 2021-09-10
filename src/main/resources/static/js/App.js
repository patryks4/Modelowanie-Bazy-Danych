'use strict';
window.onload = init;
let isMoving = false;
let addRow = false;
let selectedEntity;
let entitiesMap = new Map;
let selectedText;
let isStretching = false;
let currentPreviewLine;
let selectedRelation;
let relations = new Map
function createSVGElement(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function init() {
    let addRowButton= document.getElementById("addRow");
    addRowButton.addEventListener("click" ,function (){
        selectedEntity.addRow();
    });
    let getSqlButton = document.getElementById("getSql");
    getSqlButton.addEventListener("click", function (){
        getDataFromEntities()
    })
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
    let key = "relation-0";
    let relationNumber = 0;
    while (relations.has(key)) {
        relationNumber++;
        key = "relation-" + relationNumber;
    }
    let position = getMousePosition(event);
    let relationView = new RelationView(position.x, position.y,relationType, key);
    let relation = relationView.createBody();
    document.getElementById("svg-view").appendChild(relation);
    relation.addEventListener('dblclick',changeVisibility)
    let relationData = new Relation(key,relationType)
    relations.set(key, relationData);
    makeDraggable(relation);
}

function createPreviewLine(event) {
    selectedEditPoint = event.target;
    let mainLine =  selectedRelation.lastChild.childNodes.item(0)
    let startPoint = getStartPoint(mainLine)
    let mousePos = getMousePosition(event)
    let previewLine = new PreviewLine(startPoint.x,startPoint.y)
    currentPreviewLine = previewLine.createBody(1)
    document.getElementById("svg-view").appendChild(currentPreviewLine);
    isStretching = true;
    window.addEventListener("mousemove",stretchLine)
    window.addEventListener("mouseup", switchOffStretching);
}





