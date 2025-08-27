package com.jobapplication.user_service.service;

import com.jobapplication.user_service.dto.ResponseDTO;
import com.jobapplication.user_service.dto.UserDTO;
import com.jobapplication.user_service.model.Role;
import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.repository.UserRepository;
import com.jobapplication.user_service.utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String SECRET_KEY;


    public void createUser(UserDTO userDTO, MultipartFile resume) throws IOException {
        User user = User.builder()
                .username(userDTO.getUsername())
                .role(Role.valueOf(userDTO.getRole().toUpperCase()))
                .location(userDTO.getLocation())
                .phone(userDTO.getPhone())
                .name(userDTO.getName()).build();
        if(user.getRole() == Role.APPLICANT && resume == null && resume.isEmpty())
            throw new RuntimeException("Resume required");

        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());

        if(optionalUser.isPresent())
            throw  new RuntimeException("User already exists with username: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));


        user.setResumeName(resume.getOriginalFilename());
        user.setResume(resume.getBytes());
        userRepository.save(user);
    }

    public ResponseDTO login(User user)
    {
      User exisitingUser = userRepository.findByUsername(user.getUsername())
               .filter(u -> passwordEncoder.matches(user.getPassword(), u.getPassword()))
               .orElseThrow(() -> new RuntimeException("Invalid username or password"));

      String token = JWTUtils.generateJWTToken(exisitingUser.getId(),exisitingUser.getUsername(), SECRET_KEY);
      return ResponseDTO.builder()
              .token(token)
              .user(UserDTO.builder()
                      .username(exisitingUser.getUsername())
                      .role(exisitingUser.getRole().toString())
                      .userId(exisitingUser.getId())
                      .name(exisitingUser.getName())
                      .build())
              .build();
    }

}
