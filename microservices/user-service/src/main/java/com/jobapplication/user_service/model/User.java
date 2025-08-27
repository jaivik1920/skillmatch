package com.jobapplication.user_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.APPLICANT;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] resume;

    private String resumeName;
}
