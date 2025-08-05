package com.jobapplication.user_service.service;

import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.repository.UserRepository;
import com.jobapplication.user_service.utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String SECRET_KEY;


    public void createUser(User user)
    {
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());

        if(optionalUser.isPresent())
            throw  new RuntimeException("User already exists with username: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String login(User user)
    {
       return userRepository.findByUsername(user.getUsername())
               .filter(u -> passwordEncoder.matches(user.getPassword(), u.getPassword()))
               .map( u -> JWTUtils.generateJWTToken(u.getUsername(), SECRET_KEY))
               .orElseThrow(() -> new RuntimeException("Invalid username or password"));
    }

}
