package com.jobapplication.user_service.controller;

import com.jobapplication.user_service.utils.JWTUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/users")
    public String getHello()
    {
        return "Hello 3orld!";
    }

    @GetMapping("/login")
    public String getLogin()
    {
        return "Login endpoint";
    }

}
