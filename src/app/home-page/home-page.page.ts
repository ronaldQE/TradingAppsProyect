import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
    //para navegacion
  }

  goCompanyInformation(){
    this.navigateTo('information');
  }

  goLastEstimate(){
    this.navigateTo('business-plan');
  }

  goHistorial(){
    this.navigateTo('estimate-history');
  }

  newEstimation(){
    console.log("holaaa");
  }
  
}
