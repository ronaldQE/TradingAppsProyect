import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.page.html',
  styleUrls: ['./business-plan.page.scss'],
})
export class BusinessPlanPage implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }



}
