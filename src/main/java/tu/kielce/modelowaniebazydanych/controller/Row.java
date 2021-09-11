package tu.kielce.modelowaniebazydanych.controller;

public class Row {
    private Boolean key;
    private String name;
    private String type;

    public Row() {
    }

    public Row(Boolean key, String name, String type) {
        this.key = key;
        this.name = name;
        this.type = type;
    }

    public Boolean getKey() {
        return key;
    }

    public void setKey(Boolean key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
