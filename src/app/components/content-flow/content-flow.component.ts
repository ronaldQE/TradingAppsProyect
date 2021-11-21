import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

@Component({
  selector: 'app-content-flow',
  templateUrl: './content-flow.component.html',
  styleUrls: ['./content-flow.component.scss'],
})
export class ContentFlowComponent implements OnInit {

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {}
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
