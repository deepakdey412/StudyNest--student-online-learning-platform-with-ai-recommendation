
package com.studyNest.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

@Entity
@Table(name = "student_results")
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // PRN used to map to Student entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prn", referencedColumnName = "prn", nullable = false)
    private Student student;

    @Min(value = 0, message = "Module 1 marks must be between 0 and 100")
    @Max(value = 100, message = "Module 1 marks must be between 0 and 100")
    @Column(name = "module1_marks")
    private Integer module1Marks;

    @Min(value = 0, message = "Module 2 marks must be between 0 and 100")
    @Max(value = 100, message = "Module 2 marks must be between 0 and 100")
    @Column(name = "module2_marks")
    private Integer module2Marks;

    @Min(value = 0, message = "Module 3 marks must be between 0 and 100")
    @Max(value = 100, message = "Module 3 marks must be between 0 and 100")
    @Column(name = "module3_marks")
    private Integer module3Marks;

    @Min(value = 0, message = "Module 4 marks must be between 0 and 100")
    @Max(value = 100, message = "Module 4 marks must be between 0 and 100")
    @Column(name = "module4_marks")
    private Integer module4Marks;

    @Min(value = 0, message = "Module 5 marks must be between 0 and 100")
    @Max(value = 100, message = "Module 5 marks must be between 0 and 100")
    @Column(name = "module5_marks")
    private Integer module5Marks;

    @Column(name = "average_marks")
    private BigDecimal averageMarks;

    @Column(name = "status")
    private String status;

    // New field for storing semester information
    @Column(name = "module_semester")
    private Integer moduleSemester;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "roll_number")
    private String rollNumber;

    // Constructors
    public StudentResult() {}

    public StudentResult(Student student, Integer module1Marks, Integer module2Marks,
                         Integer module3Marks, Integer module4Marks, Integer module5Marks, Integer moduleSemester , String studentName, String rollNumber) {
        this.student = student;
        this.module1Marks = module1Marks;
        this.module2Marks = module2Marks;
        this.module3Marks = module3Marks;
        this.module4Marks = module4Marks;
        this.module5Marks = module5Marks;
        this.moduleSemester = moduleSemester;
        this.studentName = studentName;
        this.rollNumber = rollNumber;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getModule1Marks() {
        return module1Marks;
    }

    public void setModule1Marks(Integer module1Marks) {
        this.module1Marks = module1Marks;
    }

    public Integer getModule2Marks() {
        return module2Marks;
    }

    public void setModule2Marks(Integer module2Marks) {
        this.module2Marks = module2Marks;
    }

    public Integer getModule3Marks() {
        return module3Marks;
    }

    public void setModule3Marks(Integer module3Marks) {
        this.module3Marks = module3Marks;
    }

    public Integer getModule4Marks() {
        return module4Marks;
    }

    public void setModule4Marks(Integer module4Marks) {
        this.module4Marks = module4Marks;
    }

    public Integer getModule5Marks() {
        return module5Marks;
    }

    public void setModule5Marks(Integer module5Marks) {
        this.module5Marks = module5Marks;
    }

    public BigDecimal getAverageMarks() {
        return averageMarks;
    }

    public void setAverageMarks(BigDecimal averageMarks) {
        this.averageMarks = averageMarks;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getModuleSemester() {
        return moduleSemester;
    }

    public void setModuleSemester(Integer moduleSemester) {
        this.moduleSemester = moduleSemester;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    // Add getPrn() method to fetch PRN from Student entity
    public String getPrn() {
        return student != null ? student.getPrn() : null;
    }

}
