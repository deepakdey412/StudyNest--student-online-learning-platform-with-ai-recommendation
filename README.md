
# 📚 StudyNest – Student-Tutor Learning Platform

**StudyNest** is a full-stack web application that connects students and tutors through a secure, role-based platform. It allows users to register as either a **Student** or **Tutor**, log in, and access customized dashboards and functionalities based on their roles.

---

## 🚀 Tech Stack

**Backend:** Java, Spring Boot, Spring Security, JPA, Hibernate
**Frontend:** Thymeleaf, HTML, CSS
**Database:** MySQL
**Tools:** Maven, Spring Tool Suite (STS) / IntelliJ IDEA

---

## 🔐 Features

* **Role-Based Authentication:** Separate access for Students and Tutors.

* **Secure Login & Registration:** Passwords encrypted using BCrypt.

* **Student Features:**

  * Register and manage profile.
  * Browse and connect with tutors.

* **Tutor Features:**

  * Create and manage teaching profiles.
  * View student inquiries and manage sessions.

* **Admin (optional future module):**

  * Monitor users and manage system data.

---

## ⚙️ Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/StudyNest.git
```

### 2️⃣ Open in your IDE

Use **Spring Tool Suite (STS)** or **IntelliJ IDEA**.

### 3️⃣ Configure Database

Update your `application.properties` file with your local MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studynest_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4️⃣ Run the Application

Run `StudyNestApplication.java` as a **Spring Boot Application**.
Visit [http://localhost:8080](http://localhost:8080/welcome) in your browser.

---

## 🧩 Folder Structure

```
StudyNest/
 ├── src/
 │   ├── main/
 │   │   ├── java/com/studynest/
 │   │   │   ├── controller/
 │   │   │   ├── model/
 │   │   │   ├── repository/
 │   │   │   ├── service/
 │   │   │   └── config/
 │   │   └── resources/
 │   │       ├── templates/ (Thymeleaf HTML files)
 │   │       └── static/ (CSS, JS)
 ├── pom.xml
 └── README.md
```

---

## 🎨 UI Theme

* Clean **light purple and white** gradient theme.
* Simple, user-friendly design built with **Thymeleaf**, **HTML5**, and **CSS3**.

---

## 🧠 Learning Outcomes

This project helped in understanding:

* Spring Boot MVC architecture
* Role-based authentication using **Spring Security**
* Integration of **Thymeleaf** templates with backend
* CRUD operations using **Spring Data JPA**
* Secure password handling using **BCrypt**

---

## 👨‍💻 Developed By

**Deepak**
B.Tech – Computer Science & Engineering (7th Semester)
📧 [[deepakdey412@gmail.com](mailto:deepakdey412@gmail.com)]
🔗 [https://www.linkedin.com/in/deepakdey/]

---
