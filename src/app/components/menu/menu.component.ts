import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [
    { title: 'Plan de negocios', url: '/folder/Plan de negocios', icon: 'bar-chart' },
    { title: 'Información de la Empresa', url: '/folder/Información de la Empresa', icon: 'business' },
    { title: 'Historial de estimaciones', url: '/folder/Historial de estimaciones', icon: 'albums' },
    { title: 'Salir', url: '/folder/Archived', icon: 'exit' },
  ];

  constructor() { }

  ngOnInit() {}

}
