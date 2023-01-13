import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'titanicStats';
  isAuth: boolean = false;
  authSubscription: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService._isAuth.subscribe({
      next: (data) => {
        this.isAuth = data;
      }
    })
  }

  ngOnChanges(): void {
    this.isAuth = this.authService.isAuthenticated()
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }
}
