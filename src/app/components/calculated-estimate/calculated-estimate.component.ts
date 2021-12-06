import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculated-estimate',
  templateUrl: './calculated-estimate.component.html',
  styleUrls: ['./calculated-estimate.component.scss'],
})
export class CalculatedEstimateComponent implements OnInit {
  //@Input() id:number;
  @Input() title:string;
  @Input() van:number;
  @Input() tir:string;
  @Input() idEstim:string;

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {}

  navigateTo(path: string) {
    this.router.navigate([path]);
    localStorage.setItem('idEstim',this.idEstim);
  }

}
