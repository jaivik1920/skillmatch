package com.jobapplication.user_service.service;

import com.jobapplication.user_service.config.UserContext;
import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User getUserProfile()
    {
        int userId = UserContext.getUserId();
        User user= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id" + userId));
        user.setPassword("");
        return user;
    }


    public User updateUserProfile(User user)
    {
        int userId = UserContext.getUserId();

        if(user.getId() != userId)
            throw  new RuntimeException("Invalid Operation");

        User dbSaveUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id" + userId));

        if(!user.getName().isEmpty())
            dbSaveUser.setName(user.getName());

        if(!user.getPassword().isEmpty())
            dbSaveUser.setPassword(passwordEncoder.encode(user.getPassword()));

        if(!user.getPhone().isEmpty())
            dbSaveUser.setPhone(user.getPhone());
        if(!user.getLocation().isEmpty())
            dbSaveUser.setLocation(user.getLocation());

        dbSaveUser = userRepository.save(dbSaveUser);
        dbSaveUser.setPassword("");
        return dbSaveUser;
    }

}
