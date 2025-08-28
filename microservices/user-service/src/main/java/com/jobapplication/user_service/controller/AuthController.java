package com.jobapplication.user_service.controller;

import com.jobapplication.user_service.dto.UserDTO;
import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(@ModelAttribute UserDTO userDTO, @RequestParam(value = "resume" ,required = false)MultipartFile resume) {
        try
        {
            authService.createUser(userDTO,resume);
            return ResponseEntity.status(HttpStatus.CREATED).body("User "+ userDTO.getUsername()+" registered successfully");
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user)
    {
        try{
            return ResponseEntity.ok(authService.login(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: " + e.getMessage());
        }
    }

}
