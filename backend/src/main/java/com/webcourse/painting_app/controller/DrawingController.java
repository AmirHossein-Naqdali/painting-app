package com.webcourse.painting_app.controller;

import com.webcourse.painting_app.dto.DrawingRequest;
import com.webcourse.painting_app.model.Drawing;
import com.webcourse.painting_app.service.DrawingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drawings")
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController {

    @Autowired
    private DrawingService drawingService;

    @PostMapping("/{username}")
    public ResponseEntity<Drawing> saveOrUpdateDrawing(@PathVariable String username, @RequestBody DrawingRequest drawingRequest) {
        Drawing savedDrawing = drawingService.saveOrUpdateDrawing(username, drawingRequest);
        return ResponseEntity.ok(savedDrawing);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Drawing> getDrawing(@PathVariable String username) {
        Drawing drawing = drawingService.getDrawing(username);
        return ResponseEntity.ok(drawing);
    }
}
