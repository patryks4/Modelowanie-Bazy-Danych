
function changeVisibility(event) {
    let parent = getRelationParent(event.target.parentNode)
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
