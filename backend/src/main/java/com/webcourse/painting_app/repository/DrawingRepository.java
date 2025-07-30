package com.webcourse.painting_app.repository;

import com.webcourse.painting_app.model.Drawing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    
}
