import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>MOYO</h1>
          <span class="subtitle">Client Portal</span>
        </div>
        <p class="welcome-text">Welcome to our client portal. Please sign in to continue.</p>
        <button (click)="login()" class="login-button">
          <i class="fas fa-sign-in-alt"></i> Sign In with Auth0
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 1rem;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .login-header {
      margin-bottom: 2rem;

      h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        margin: 0;
      }

      .subtitle {
        color: #7f8c8d;
        font-size: 1.1rem;
      }
    }

    .welcome-text {
      color: #666;
      margin-bottom: 2rem;
    }

    .login-button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2980b9;
      }
    }
  `]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
}