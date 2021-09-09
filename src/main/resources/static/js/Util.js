function getMousePosition(event) {
    let svg = document.getElementById("svg-view");
    let CTM = svg.getScreenCTM();
    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    };
}

function addEditField(event) {
    console.log("edit field");
    console.log(event.target.id);
    selectedText = document.getElementById(event.target.id);
    let tDiv = document.createElement("div");
    tDiv.setAttribute("id", "edit-text");
    tDiv.setAttribute("contenteditable", "true");
    tDiv.classList.add("edit-field");
    tDiv.style.left=(event.pageX -50)+"px";
    tDiv.style.top=(event.pageY-12)+"px";
    document.getElementsByTagName("body")[0].appendChild(tDiv);
    window.addEventListener("click", switchText);

}

function switchText(event) {
    let textEditDiv = document.getElementById('edit-text');
    if (event.target.id !== textEditDiv.id)
    {
        selectedText.textContent = textEditDiv.textContent;
        textEditDiv.parentNode.removeChild(textEditDiv);
        window.removeEventListener('click', switchText);
    }

}
function createHorizontalLine(x,y,width){
    let line = createSVGElement("line");
    line.setAttribute("x1",x);
    line.setAttribute("y1",y);
    line.setAttribute("x2",x+width);
    line.setAttribute("y2",y);
    line.classList.add("entity");
    return line;
}
function createVerticalLine(x,y, height){
    let line = createSVGElement("line");
    line.setAttribute("x1",x);
    line.setAttribute("y1",y);
    line.setAttribute("x2",x);
    line.setAttribute("y2", y - height);
    line.classList.add("entity");
    return line;
}

function createDiagonalLine(x1,y1,x2,y2){
    let line = createSVGElement("line");
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2", y2);
    line.classList.add("entity");
    return line;
}