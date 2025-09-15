package com.deepak.Study_Nest.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "tutor_details")
public class TutorDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tutor_id")
    private Long tutorId;

    @NotBlank(message = "Name is required")
    @Column(name = "tutor_name", nullable = false)
    private String tutorName;

    @NotBlank(message = "Subjects are required")
    @Column(name = "tutor_subjects", nullable = false)
    private String tutorSubjects;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "tutor_email", nullable = false, unique = true)
    private String tutorEmail;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(name = "tutor_password", nullable = false)
    private String tutorPassword;

    public TutorDetails() {
    }

    public TutorDetails(Long tutorId, String tutorName, String tutorSubjects,
                        String tutorEmail, String tutorPassword) {
        this.tutorId = tutorId;
        this.tutorName = tutorName;
        this.tutorSubjects = tutorSubjects;
        this.tutorEmail = tutorEmail;
        this.tutorPassword = tutorPassword;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public String getTutorName() {
        return tutorName;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    public String getTutorSubjects() {
        return tutorSubjects;
    }

    public void setTutorSubjects(String tutorSubjects) {
        this.tutorSubjects = tutorSubjects;
    }

    public String getTutorEmail() {
        return tutorEmail;
    }

    public void setTutorEmail(String tutorEmail) {
        this.tutorEmail = tutorEmail;
    }

    public String getTutorPassword() {
        return tutorPassword;
    }

    public void setTutorPassword(String tutorPassword) {
        this.tutorPassword = tutorPassword;
    }
}
