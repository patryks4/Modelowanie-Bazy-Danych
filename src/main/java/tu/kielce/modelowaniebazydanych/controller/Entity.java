package tu.kielce.modelowaniebazydanych.controller;

import java.util.List;

public class Entity {
    private String tableName;
    private List<Row> rows;

    public Entity() {
    }

    public Entity(String tableName, List<Row> rows) {
        this.tableName = tableName;
        this.rows = rows;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<Row> getRows() {
        return rows;
    }

    public void setRows(List<Row> rows) {
        this.rows = rows;
    }
}
