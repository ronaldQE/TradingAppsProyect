import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  idEstim:String = "";
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) {}

  ngOnInit() {
    this.idEstim = this.getId();
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
  
  getId(){
    return this.db.generateId();
  }
}
