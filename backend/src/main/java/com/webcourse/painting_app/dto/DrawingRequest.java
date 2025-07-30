package com.webcourse.painting_app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DrawingRequest {

    private String title;
    private String content;
}
