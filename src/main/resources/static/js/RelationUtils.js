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
    reDrawMainLine(mousePosition)
    redrawEditPoint(mousePosition)

}

function reDrawMainLine(mousePosition) {
    let line = selectedRelation.lastChild.childNodes.item(0)
    let middleOfLine = calcMiddlePoint(line)
    console.log(selectedEditPoint)
    if (isSelectedLeftEditPoint(middleOfLine)){
        line.setAttribute("x1",mousePosition.x);
        line.setAttribute("y1",mousePosition.y);
    } else {
        line.setAttribute("x2",mousePosition.x);
        line.setAttribute("y2",mousePosition.y);
    }

}

function isSelectedLeftEditPoint(middleOfLine){
    console.log("Result : " + (selectedEditPoint.getAttribute("x") - middleOfLine))
    return selectedEditPoint.getAttribute("x") - middleOfLine <0
}

function getStartPoint(line) {
    let middleOfLine = calcMiddlePoint(line)

    if (isSelectedLeftEditPoint(middleOfLine)){
        console.log("left point")
        return {
            x: line.getAttribute('x2'),
            y: line.getAttribute('y2')
        };
    }else {
        console.log("right point")
        return {
            x: line.getAttribute('x1'),
            y: line.getAttribute('y1')
        };
    }
}

function calcMiddlePoint(line){
    console.log("X1:" + Number.parseInt(line.getAttribute("x1")))
    console.log("X2:" + Number.parseInt(line.getAttribute("x2")))
    console.log("MIddlr : " + ((Number.parseInt(line.getAttribute("x1")) + Number.parseInt(line.getAttribute("x2"))) / 2))
    return (Number.parseInt(line.getAttribute("x1")) + Number.parseInt(line.getAttribute("x2"))) / 2
}


function redrawEditPoint(mousePosition) {
    let line = selectedRelation.lastChild.childNodes.item(0)
    let middleOfLine = calcMiddlePoint(line)
    if (isSelectedLeftEditPoint(middleOfLine)){
        selectedEditPoint.setAttribute("x", mousePosition.x - 10);
        selectedEditPoint.setAttribute("y", mousePosition.y -5);
    } else {
        selectedEditPoint.setAttribute("x", mousePosition.x);
        selectedEditPoint.setAttribute("y", mousePosition.y - 5);
    }

}