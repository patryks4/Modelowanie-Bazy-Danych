package tu.kielce.modelowaniebazydanych.controller;

public enum SqlType {
    INT("int"),
    VARCHAR("varchar");

    private String typeName;

    SqlType(String typeName) {
        this.typeName = typeName;
    }

    public String getTypeName() {
        return typeName;
    }
}
