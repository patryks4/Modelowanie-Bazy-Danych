package tu.kielce.modelowaniebazydanych.controller;

import java.util.List;

public class SchemaData {
    private List<Entity> entities;
    private List<Relation> relations;

    public SchemaData() {
    }

    public SchemaData(List<Entity> entities, List<Relation> relations) {
        this.entities = entities;
        this.relations = relations;
    }

    public List<Entity> getEntities() {
        return entities;
    }

    public void setEntities(List<Entity> entities) {
        this.entities = entities;
    }

    public List<Relation> getRelations() {
        return relations;
    }

    public void setRelations(List<Relation> relations) {
        this.relations = relations;
    }
}
