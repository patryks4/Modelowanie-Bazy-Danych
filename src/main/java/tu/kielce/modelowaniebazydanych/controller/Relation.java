package tu.kielce.modelowaniebazydanych.controller;

public class Relation {
    private String relationId;
    private String type;
    private String leftSide;
    private String rightSide;
    private String leftSideTable;
    private String rightSideTable;
    public Relation() {
    }

    public Relation(String relationId, String type, String leftSide, String rightSide, String leftSideTable, String rightSideTable) {
        this.relationId = relationId;
        this.type = type;
        this.leftSide = leftSide;
        this.rightSide = rightSide;
        this.leftSideTable = leftSideTable;
        this.rightSideTable = rightSideTable;
    }

    public String getRelationId() {
        return relationId;
    }

    public void setRelationId(String relationId) {
        this.relationId = relationId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLeftSide() {
        return leftSide;
    }

    public void setLeftSide(String leftSide) {
        this.leftSide = leftSide;
    }

    public String getRightSide() {
        return rightSide;
    }

    public void setRightSide(String rightSide) {
        this.rightSide = rightSide;
    }

    public String getLeftSideTable() {
        return leftSideTable;
    }

    public void setLeftSideTable(String leftSideTable) {
        this.leftSideTable = leftSideTable;
    }

    public String getRightSideTable() {
        return rightSideTable;
    }

    public void setRightSideTable(String rightSideTable) {
        this.rightSideTable = rightSideTable;
    }
}
