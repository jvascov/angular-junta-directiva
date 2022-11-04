import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;
  @Output() texto: EventEmitter<string> = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
