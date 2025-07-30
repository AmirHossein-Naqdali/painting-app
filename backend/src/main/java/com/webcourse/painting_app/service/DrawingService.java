package com.webcourse.painting_app.service;

import com.webcourse.painting_app.dto.DrawingRequest;
import com.webcourse.painting_app.exception.ResourceNotFoundException;
import com.webcourse.painting_app.model.Drawing;
import com.webcourse.painting_app.model.User;
import com.webcourse.painting_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DrawingService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Drawing saveOrUpdateDrawing(String username, DrawingRequest drawingRequest) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot save drawing. User not found with username: " + username));

        Drawing drawing = user.getDrawing();
        if (drawing == null) {
            drawing = new Drawing();
            drawing.setUser(user);
            user.setDrawing(drawing);
        }

        drawing.setTitle(drawingRequest.getTitle());
        drawing.setContent(drawingRequest.getContent());
        User savedUser = userRepository.save(user);
        return savedUser.getDrawing();
    }

    @Transactional(readOnly = true)
    public Drawing getDrawing(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Drawing drawing = user.getDrawing();
        if (drawing == null)
            throw new ResourceNotFoundException("Drawing not found for user: " + username);

        return drawing;
    }
}