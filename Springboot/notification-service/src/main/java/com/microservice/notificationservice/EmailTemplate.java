package com.microservice.notificationservice;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

public class EmailTemplate {
    private String template;
    // private Map<String, String> replacementParams;

    public EmailTemplate(String customTemplate) {
        try {
            this.template = loadTemplate(customTemplate);

        } catch (Exception e) {
            this.template = "Empty";
            e.printStackTrace();
        }
    }

    private String loadTemplate(String customTemplate) throws Exception {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(customTemplate).toURI());
        String content = "Empty";

        try {
            content = new String(Files.readAllBytes(file.toPath()));

        } catch (IOException e) {
            throw new Exception("Couldn't read template = " + customTemplate);
        }
        return content;
    }

    public String getTemplate(Map<String, String> replacement) {
        String cTemplate = this.template;

        for (Map.Entry<String, String> entry : replacement.entrySet()) {
            cTemplate = cTemplate.replace("{{"+entry.getKey()+"}}", entry.getValue());
        }

        return cTemplate;
    }
}
