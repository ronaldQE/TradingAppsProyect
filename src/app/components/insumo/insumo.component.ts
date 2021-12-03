import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss'],
})
export class InsumoComponent implements OnInit {
  @Input() nombreInsumo:string;

  constructor() { }

  ngOnInit() {}

}
