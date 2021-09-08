class PreviewLine{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    createBody(width){
        let previewLineBody = createSVGElement("g");
        let line = createHorizontalLine(this.x, this.y, width);
        line.classList.add("preview-line");
        previewLineBody.appendChild(line)
        return previewLineBody;
    }
}