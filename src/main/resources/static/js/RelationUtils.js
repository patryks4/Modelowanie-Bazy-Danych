let selectedEditPoint;
function changeVisibility(event) {
    let parent = getRelationParent(event.target.parentNode);
    selectedRelation =parent;
        parent.childNodes.forEach((element) =>
        {
            if(element.classList.contains("stretch-point")){
                if (element.classList.contains("hidden")){
                    show(element)
                } else {
                    hide(element)
                }
            }
        }
    )
}

function getRelationParent(element){
    while (!element.classList.contains("draggable")){
        element = element.parentNode
    }
    return element;
}
function show(element) {
    element.classList.remove("hidden")
    element.classList.add("visible")
}

function hide(element) {
    element.classList.remove("visible")
    element.classList.add("hidden")
}


function reDrawRelation(event) {
    let mainLine = selectedRelation.lastChild.childNodes.item(0)
    let mousePosition = getMousePosition(event);
    reDrawLine(mainLine,mousePosition)

}

function reDrawLine(line,mousePosition,target) {
    let middleOfLine = Number.parseInt(line.getAttribute("x1") + line.getAttribute("x2"))
    console.log(selectedEditPoint)
    if (selectedEditPoint.getAttribute("x") - middleOfLine <0){
        line.setAttribute("x1",mousePosition.x);
        line.setAttribute("y1",mousePosition.y);
    } else {
        line.setAttribute("x2",mousePosition.x);
        line.setAttribute("y2",mousePosition.y);
    }

}