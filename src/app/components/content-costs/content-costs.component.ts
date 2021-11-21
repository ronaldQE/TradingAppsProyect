import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

@Component({
  selector: 'app-content-costs',
  templateUrl: './content-costs.component.html',
  styleUrls: ['./content-costs.component.scss'],
})
export class ContentCostsComponent implements OnInit {

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {}

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
