import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log(response);
          if (response.user.role.name === 'admin') {
            this.router.navigate(['/admin/espacios']);
          } else {
            this.router.navigate(['/reservations']);
          }
        },
        error => {
          this.error = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
          console.error('Error de inicio de sesión:', error);
        }
      );
    }
  }
}
