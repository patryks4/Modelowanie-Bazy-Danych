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
    let mousePosition = getMousePosition(event);
    reDrawMainLine(mousePosition,event)
    //redrawEditPoint(mousePosition)
    hideLines()
    removePreviewLine()
}

function reDrawMainLine(mousePosition,event) {
    if (event.target.classList.contains("entity")){
        let targetX = calcTargetX(event.target)
        redrawLine(targetX,mousePosition.y)
        redrawEditPoint(targetX,mousePosition.y)
    }else{
        redrawLine(mousePosition.x,mousePosition.y)
        redrawEditPoint(mousePosition.x,mousePosition.y)
    }


}

function calcTargetX(target) {
    if (target.hasAttribute("transform")) {
        let style = window.getComputedStyle(target.parentNode);
        let matrix = new WebKitCSSMatrix(style.transform);
        return Number.parseInt(target.getAttribute("x")) + matrix.m41
    } else{
        return Number.parseInt(target.getAttribute("x"))
    }
}

function redrawLine(x,y) {
    let line = selectedRelation.lastChild.childNodes.item(0)
    let middleOfLine = calcMiddlePoint(line)
    if (isSelectedLeftEditPoint(middleOfLine)){
        line.setAttribute("x1",x);
        line.setAttribute("y1",y);
    } else {
        line.setAttribute("x2",x);
        line.setAttribute("y2",y);
    }
}

function isSelectedLeftEditPoint(middleOfLine){
    return selectedEditPoint.getAttribute("x") - middleOfLine <0
}

function getStartPoint(line) {
    let middleOfLine = calcMiddlePoint(line)

    if (isSelectedLeftEditPoint(middleOfLine)){
        return {
            x: line.getAttribute('x2'),
            y: line.getAttribute('y2')
        };
    }else {
        return {
            x: line.getAttribute('x1'),
            y: line.getAttribute('y1')
        };
    }
}

function calcMiddlePoint(line){
    /*console.log("X1:" + Number.parseInt(line.getAttribute("x1")))
    console.log("X2:" + Number.parseInt(line.getAttribute("x2")))
    console.log("MIddlr : " + ((Number.parseInt(line.getAttribute("x1")) + Number.parseInt(line.getAttribute("x2"))) / 2))*/
    return (Number.parseInt(line.getAttribute("x1")) + Number.parseInt(line.getAttribute("x2"))) / 2
}


function redrawEditPoint(x,y) {
    let line = selectedRelation.lastChild.childNodes.item(0)
    let middleOfLine = calcMiddlePoint(line)
    if (isSelectedLeftEditPoint(middleOfLine)){
        selectedEditPoint.setAttribute("x", x - 10);
        selectedEditPoint.setAttribute("y", y -5);
    } else {
        selectedEditPoint.setAttribute("x", x);
        selectedEditPoint.setAttribute("y", y - 5);
    }
}

function hideLines() {
    let lines = selectedRelation.lastChild.childNodes
    for (let i = 1; i < lines.length; i++) {
        lines[i].classList.add("hidden")
    }
}

function removePreviewLine() {
    currentPreviewLine.remove()
}