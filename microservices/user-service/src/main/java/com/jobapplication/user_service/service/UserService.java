package com.jobapplication.user_service.service;

import com.jobapplication.user_service.config.UserContext;
import com.jobapplication.user_service.dto.UserDTO;
import com.jobapplication.user_service.model.User;
import com.jobapplication.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

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

        if(user.getResumeName()!= null && !user.getResumeName().isEmpty())
            dbSaveUser.setResumeName(user.getResumeName());

        if(user.getResume() != null && user.getResume().length > 0)
            dbSaveUser.setResume(user.getResume());

        dbSaveUser = userRepository.save(dbSaveUser);
        dbSaveUser.setPassword("");
        return dbSaveUser;
    }

    public User updateProfileWithResume(UserDTO userDTO, MultipartFile resume) throws IOException {
        User user = User.builder()
                .id(userDTO.getUserId())
                .name(userDTO.getName())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .phone(userDTO.getPhone())
                .location(userDTO.getLocation())
                .build();
        if(resume != null && !resume.isEmpty()) {
            user.setResumeName(resume.getOriginalFilename());
            user.setResume(resume.getBytes());
        }

        return updateUserProfile(user);



    }
    public ResponseEntity<?> downloadResume(String username)
    {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty() || userOptional.get().getResume() == null )
        {
                throw  new RuntimeException("Resume not found");
        }

        User user = userOptional.get();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getResumeName() + "\"")
                .body(user.getResume());
    }

}
