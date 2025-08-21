package com.studyNest.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Set;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Roll number is required")
    @Column(unique = true)
    private String rollNo;

    @NotBlank(message = "PRN is required")
    private String prn;

    @Min(1)
    @Max(8)
    private int semester;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "\\d{10}", message = "Mobile must be 10 digits")
    private String mobile;

    @NotBlank(message = "Password is required")
    private String password;

    // One-to-many relationship with StudentResult
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StudentResult> studentResults;

    // Constructors, Getters, and Setters

    public Student() {
    }

    public Student(String name, String rollNo, String prn, int semester, String mobile, String password) {
        this.name = name;
        this.rollNo = rollNo;
        this.prn = prn;
        this.semester = semester;
        this.mobile = mobile;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getPrn() {
        return prn;
    }

    public void setPrn(String prn) {
        this.prn = prn;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter for studentResults
    public Set<StudentResult> getStudentResults() {
        return studentResults;
    }

    public void setStudentResults(Set<StudentResult> studentResults) {
        this.studentResults = studentResults;
    }

    public Student orElse(Object o) {
        return null ;
    }
}
