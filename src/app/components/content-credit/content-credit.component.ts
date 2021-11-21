import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

@Component({
  selector: 'app-content-credit',
  templateUrl: './content-credit.component.html',
  styleUrls: ['./content-credit.component.scss'],
})
export class ContentCreditComponent implements OnInit {

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {}
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
