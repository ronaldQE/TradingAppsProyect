import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private platform: Platform
  public appPages = [
    { title: 'Plan de negocios', url: '/folder/Plan de negocios', icon: 'bar-chart' },
    { title: 'Información de la Empresa', url: '/folder/Información de la Empresa', icon: 'business' },
    { title: 'Historial de estimaciones', url: '/folder/Historial de estimaciones', icon: 'albums' },
    { title: 'Salir', url: '/folder/Archived', icon: 'exit' },
  ];

  constructor(
    private router: Router,

  ) { }

  ngOnInit() { }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  navigateToPla(path: String) {
    this.router.navigate([path, localStorage.getItem('idEstim'), localStorage.getItem('title')]);
  }
  salirApp() {
    //window.close();
    if (this.platform.is("android")) {
      this.platform.backButton.subscribe(() => {
        if (window.location.pathname === "/home-page") {
          navigator['app'].exitApp();
        }
      });
    }else{
      window.close();
    }
  }
}
