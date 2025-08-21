package com.studyNest.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

@Service
public class CohereService {

    private static final String API_URL = "https://api.cohere.ai/generate";
    private static final String API_KEY = "fd8qTqMlNN6mJrPdiIy778avGZtn3BzOFEcXoCFG";

    public String getRecommendation(String weakModule) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Cohere-Version", "2022-12-06"); // version header

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "command");
        requestBody.put("prompt",
                "The student scored lowest in " + weakModule + ". Suggest a simple, friendly 2-line study plan.");
        requestBody.put("max_tokens", 100);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

            System.out.println("✅ Cohere API raw response: " + response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());

                // ✅ generations array safe extract karo
                JsonNode generations = root.path("generations");
                if (generations.isArray() && generations.size() > 0) {
                    String reply = generations.get(0).path("text").asText();
                    if (reply != null && !reply.isEmpty()) {
                        return reply.trim();
                    }
                }
                return "⚠ AI did not return a recommendation.";
            } else {
                return "⚠ Cohere API returned error: " + response.getStatusCode();
            }

        } catch (Exception e) {
            System.err.println("❌ Cohere API call failed: " + e.getMessage());
            e.printStackTrace();
            return "⚠ Could not generate AI recommendation at this time.";
        }
    }
}
