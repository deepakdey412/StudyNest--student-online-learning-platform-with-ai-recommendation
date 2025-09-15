package com.deepak.Study_Nest.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "student_details")
public class StudentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentID;

    @NotBlank(message = "Name is required")
    @Column(name = "student_name", nullable = false)
    private String studentName;

    @NotBlank(message = "Semester is required")
    @Column(name = "student_semester", nullable = false)
    private String studentSemester;

    @NotNull(message = "PRN is required")
    @Column(name = "student_prn", nullable = false, unique = true)
    private Integer studentPRN;

    @NotBlank(message = "Roll No is required")
    @Column(name = "student_roll_no", nullable = false, unique = true)
    private String studentRollNo;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "student_email", nullable = false, unique = true)
    private String studentEmail;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(name = "student_password", nullable = false)
    private String studentPassword;

    public StudentDetails() {
    }

    public StudentDetails(Long studentID, String studentName, String studentSemester, Integer studentPRN, String studentRollNo, String studentEmail, String studentPassword) {
        this.studentID = studentID;
        this.studentName = studentName;
        this.studentSemester = studentSemester;
        this.studentPRN = studentPRN;
        this.studentRollNo = studentRollNo;
        this.studentEmail = studentEmail;
        this.studentPassword = studentPassword;
    }

    public Long getStudentID() {
        return studentID;
    }

    public void setStudentID(Long studentID) {
        this.studentID = studentID;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentSemester() {
        return studentSemester;
    }

    public void setStudentSemester(String studentSemester) {
        this.studentSemester = studentSemester;
    }

    public Integer getStudentPRN() {
        return studentPRN;
    }

    public void setStudentPRN(Integer studentPRN) {
        this.studentPRN = studentPRN;
    }

    public String getStudentRollNo() {
        return studentRollNo;
    }

    public void setStudentRollNo(String studentRollNo) {
        this.studentRollNo = studentRollNo;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentPassword() {
        return studentPassword;
    }

    public void setStudentPassword(String studentPassword) {
        this.studentPassword = studentPassword;
    }
}
