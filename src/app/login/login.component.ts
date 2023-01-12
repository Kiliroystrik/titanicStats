import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage!: string;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {

    this.auth.auth(form.value.email, form.value.password).subscribe({
      next: (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData.email));
        this.router.navigate(['/home'])
      },
      error: (e) => {
        console.log(e.error);
        this.errorMessage = e.error

      }
    })

  }



}
