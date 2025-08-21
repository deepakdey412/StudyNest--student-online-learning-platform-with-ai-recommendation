package com.studyNest.config;

import com.studyNest.model.Student;
import com.studyNest.repository.StudentRepository;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/signup", "/login", "/css/**", "/images/**", "/welcome","/admin/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .usernameParameter("prn")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/dashboard", true)
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout.logoutSuccessUrl("/login?logout=true"))
                .sessionManagement(session -> session
                        .invalidSessionUrl("/login")
                        .maximumSessions(1) // Optional: Handle multiple sessions
                        .expiredUrl("/login?expired=true") // Optional: Handle session expiration
                );

        // Add a custom success handler
        http.formLogin()
                .successHandler((request, response, authentication) -> {
                    System.out.println("Login successful: " + authentication.getName());

                    response.sendRedirect("/dashboard");
                });

        return http.build();
    }



    @Bean
    public UserDetailsService userDetailsService(StudentRepository repo) {
        return prn -> {
            System.out.println("Looking for student with PRN: " + prn); // Debugging
            Student student = repo.findByPrn(prn);
            if (student == null) {
                throw new UsernameNotFoundException("User not found");
            }
            System.out.println("Found student: " + student.getName()); // Debugging
            return User.withUsername(student.getPrn())
//            passwordEncoder.matches(rawPasswordFromForm, encryptedPasswordFromDB) run internally
                    .password(student.getPassword())
                    .roles("STUDENT")
                    .build();
        };
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Password encoder(optional)
    }
}


