package com.webcourse.painting_app;

import com.webcourse.painting_app.model.User;
import com.webcourse.painting_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            String[] names = {"Kian", "Parnian", "Anahita", "Farhad", "Aida", "Aidin"};

            for (String name: names)
                userRepository.save(new User(name));    
        }
    }
}
