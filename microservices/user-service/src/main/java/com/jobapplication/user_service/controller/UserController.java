package com.jobapplication.user_service.controller;

import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile()
    {
            try{
                return ResponseEntity.ok(userService.getUserProfile());
            } catch (Exception e) {
                System.out.println("Error while fetching profile " + e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching User Profile");
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User user)
    {
        try{
            return ResponseEntity.ok(userService.updateUserProfile(user));
        } catch (Exception e) {
            System.out.println("Error while updating profile " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating Profile");
    }
}
