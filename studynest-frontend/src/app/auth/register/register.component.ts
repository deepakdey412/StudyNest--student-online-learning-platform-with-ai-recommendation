import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  role: 'STUDENT' | 'TUTOR' = 'STUDENT';
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNo: [''],  // for tutor
      rollNo: [''],    // for student
      prn: [''],       // for student
      semester: ['']   // for student
    });
  }

  selectRole(role: 'STUDENT' | 'TUTOR') {
    this.role = role;
  }

  submit() {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.value;

    if (this.role === 'STUDENT') {
      this.auth.registerStudent(data).subscribe({
        next: () => this.router.navigate(['/student/dashboard']),
        error: (err) => this.errorMsg = err.error?.message || 'Registration failed'
      });
    } else {
      this.auth.registerTutor(data).subscribe({
        next: () => this.router.navigate(['/tutor/dashboard']),
        error: (err) => this.errorMsg = err.error?.message || 'Registration failed'
      });
    }
  }
}
