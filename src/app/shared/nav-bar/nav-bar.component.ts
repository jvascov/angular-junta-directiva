import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../components/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menu: string[] = ['Propietarios', 'Actas', 'Votaciones', 'Resultados'];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(option: string) {
    console.log(option.toLocaleLowerCase());

    this.router.navigate([option.toLocaleLowerCase()]);
  }
}
