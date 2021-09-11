package tu.kielce.modelowaniebazydanych.service;

import tu.kielce.modelowaniebazydanych.controller.*;

import java.util.Locale;

public class MySqlGenerator implements SqlGenerator {
    private StringBuilder sqlScript = new StringBuilder();
    private StringBuilder relationScript =  new StringBuilder();
    private SchemaData schemaData;
    private int entityNumber = 0;
    //private Map<String, StringBuilder> entities = new HashMap<>();

    public MySqlGenerator(SchemaData schemaData) {
        this.schemaData = schemaData;
    }

    @Override
    public String createSQLScript() {
        for (Entity entity : schemaData.getEntities()) {
            createTable(entity);
        }
        for (Relation relation : schemaData.getRelations()) {
            createRelation(relation);
        }
        sqlScript.append(relationScript);
        return sqlScript.toString();
    }

    private void createTable(Entity entity) {
        sqlScript.append("CREATE TABLE ").append(entity.getTableName()).append("(");
        for (Row row : entity.getRows()) {
            addRow(row);
        }
        sqlScript.deleteCharAt(sqlScript.length() - 1);
        sqlScript.append(");");



    }

    private void addRow(Row row) {
        String type = getType(row.getType());
        if (row.getKey()) {
            sqlScript.append(row.getName()).append(" ").append(type).append(" ")
                    .append("PRIMARY KEY,");
        } else {
            sqlScript.append(row.getName()).append(" ").append(type).append(",");
        }

    }

    private String getType(String type) {
        String typeName = type;
        String typeRange = "";
        if (isValueWithRange(type)) {
            typeRange = getRange(type);
            typeName = getTypeName(type);
            System.out.println("Range " + typeRange);
            System.out.println("name " + typeName);
        }
        for (SqlType value : SqlType.values()) {
            if (value.getTypeName().equals(typeName.toLowerCase(Locale.ROOT))) {
                return value.getTypeName() + typeRange;
            }
        }
        return "null";
    }

    private boolean isValueWithRange(String type) {
        return type.contains("(");
    }

    private String getTypeName(String type) {
        int typeEnd = type.indexOf("(");
        return type.substring(0, typeEnd);
    }

    private String getRange(String type) {
        int typeEnd = type.indexOf("(");
        return type.substring(typeEnd);
    }

    private void createRelation(Relation relation) {
        relationScript.append("ALTER TABLE ");
        switch (relation.getType()) {
            case "oto":
                createRelationOtO(relation);
                break;
            case "otm":
                createRelationOtM(relation);
                break;
            case "mtm":
                createRelationMtM(relation);
                break;
        }

    }

    private void createRelationOtO(Relation relation) {
        Entity entityRight = getEntity(relation.getRightSideTable());
        Entity entityLeft = getEntity(relation.getLeftSideTable());
        String key = getKey(entityLeft);
    relationScript.append(relation.getRightSideTable())
            .append(" ADD CONSTRAINT ").append(" Id_").append(entityLeft.getTableName())
            .append(" UNIQUE FOREIGN KEY (").append(key).append(")")
            .append(" REFERENCES ")
            .append(relation.getLeftSideTable())
            .append(" (").append(relation.getLeftSideTable()).append(");");
    }

    private void createRelationOtM(Relation relation) {
        Entity entityLeft = getEntity(relation.getLeftSideTable());
        String key = getKey(entityLeft);
        relationScript.append(relation.getRightSideTable())
                .append(" ADD CONSTRAINT ").append(" Id_").append(entityLeft.getTableName())
                .append(" FOREIGN KEY (").append(key).append(")")
                .append("REFERENCES ")
                .append(relation.getLeftSideTable())
                .append(" (").append(relation.getLeftSideTable()).append(");");
    }

    private void createRelationMtM(Relation relation)
    {
        Entity entityLeft = getEntity(relation.getLeftSideTable());
        Entity entityRight = getEntity(relation.getRightSideTable());
        String leftKey = getKey(entityLeft);
        String rightKey = getKey(entityRight);
        relationScript
                .append(relation.getLeftSideTable())
                .append(relation.getRightSideTable())
                .append("Relation( ")
                .append(relation.getLeftSideTable()).append("ID").append(" INT,")
                .append(relation.getRightSideTable()).append("ID").append(" INT,")
                .append(" FOREIGN KEY ").append("(").append(relation.getLeftSideTable()).append("ID").append(") ")
                .append(" REFERENCES ").append(relation.getLeftSideTable())
                .append(" (").append(leftKey).append("),")
                .append(" FOREIGN KEY ").append("(").append(relation.getRightSide()).append("ID").append(") ")
                .append(" REFERENCES ").append(relation.getRightSideTable())
                .append(" (").append(rightKey).append(");");
    }

    private Entity getEntity(String table) {
        for (Entity entity : schemaData.getEntities()) {
            if (entity.getTableName().equals(table)){
                return entity;
            }
        }
        return null;
    }

    private String getKey(Entity entity) {
        for (Row row : entity.getRows()) {
            if (row.getKey()) {
                return row.getName();
            }
        }
        return null;
    }

}
