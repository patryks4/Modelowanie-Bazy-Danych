package tu.kielce.modelowaniebazydanych.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tu.kielce.modelowaniebazydanych.service.MySqlGenerator;
import tu.kielce.modelowaniebazydanych.service.SqlGenerator;

@RestController
@RequestMapping("/test")
public class Test {

    @PostMapping("/schema")
    public ResponseEntity<String> getSchema(@RequestBody SchemaData schema){
        System.out.println(schema.getEntities().get(0).getTableName());
        SqlGenerator sqlGenerator = new MySqlGenerator(schema);
        String sqlScript = sqlGenerator.createSQLScript();
        return ResponseEntity.ok(sqlScript);
    }
}
