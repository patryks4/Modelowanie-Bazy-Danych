let svgType;
function switchOnMoving(event) {
    if (event.button === 0){
        let dragItem = document.createElement("img");
        dragItem.id = "drag-img";
        switch (event.target.id){
            case "entity-img":
                dragItem.src = "../img/Entity.svg";
                svgType = "entity";
                break;
            case "oto-img":
                dragItem.src = "../img/OneToOne.svg";
                svgType = "oto";
                break;
            case "otm-img":
                dragItem.src = "../img/OneToMany.svg";
                svgType = "otm";
                break;
            case "mtm-img":
                dragItem.src = "../img/ManyToMany.svg";
                svgType = "mtm";
                break;
        }
        dragItem.draggable = false;
        dragItem.classList.add("dragging-img");
        document.getElementsByTagName("body")[0].appendChild(dragItem);
        const size = divideSize(dragItem);
        dragItem.style.left=event.pageX - size.width +"px";
        dragItem.style.top=event.pageY - size.height + "px";
        dragItem.style.display = "block";
        isMoving =true;
    }
}
function moveImg(event) {
    if (isMoving) {
        let dragItem = document.getElementById("drag-img");
        const size =divideSize(dragItem)
        dragItem.style.left=event.pageX - size.width +"px";
        dragItem.style.top=event.pageY - size.height + "px";
    }

}

function divideSize(element){
    let width = getComputedStyle(element).width.split('p')[0];
    let height = getComputedStyle(element).height.split('p')[0];
    width =Math.round(width/2);
    height = Math.round(height/2);
    return {width: width, height: height};

}

function switchOffMoving(event) {
    if (isMoving) {
        console.log("Off");
        isMoving = false;
        let dragItem = document.getElementById("drag-img");
        dragItem.remove();
        switch (svgType){
            case "entity":
               createEntity(event)
                break;
            case "oto":
                createRelation(event);
                break;
            case "otm":
                createRelation(event);
                break;
            case "mtm":
                createRelation(event);
                break;
        }
    }
}


function makeDraggable(element) {
    let svg = element;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    let selectedElement, offset, transform;
    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = element;
            offset = getMousePosition(evt);
            // Get all the transforms currently on this element
            let transforms = selectedElement.transform.baseVal;
            // Ensure the first transform is a translate transform
            if (transforms.length === 0 ||
                transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                let translate = selectedElement.parentNode.createSVGTransform();
                translate.setTranslate(0, 0);
                // Add the translation to the front of the transforms list
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }
            // Get initial translation amount
            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }
    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let cord = getMousePosition(evt);
            transform.setTranslate(cord.x - offset.x, cord.y - offset.y);
        }
    }
    function endDrag(evt) {
        selectedElement = null;

    }
}