import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Plan de negocios', url: '/folder/Plan de negocios', icon: 'bar-chart' },
    { title: 'Información de la Empresa', url: '/folder/Información de la Empresa', icon: 'business' },
    { title: 'Historial de estimaciones', url: '/folder/Historial de estimaciones', icon: 'albums' },
    { title: 'Salir', url: '/folder/Archived', icon: 'exit' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
