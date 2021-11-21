import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  rank: string;
}

@Component({
  selector: 'app-sale-month',
  templateUrl: './sale-month.page.html',
  styleUrls: ['./../budget/budget.page.scss','./sale-month.page.scss'],
})

export class SaleMonthPage implements OnInit {

  users: User[] = [
    {
      id: 1,
      rank: 'Alta'
    },
    {
      id: 2,
      rank: 'Media',
    },
    {
      id: 3,
      rank: 'Baja',
    }
  ];

  compareWith(o1: User, o2: User | User[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: User) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }


  constructor() { }

  ngOnInit() {
  }

}
