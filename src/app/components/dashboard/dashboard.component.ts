import { Component, OnInit } from '@angular/core';
import { Coffee } from 'src/app/models/coffee';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topCoffees = 'Top coffees';
  coffees: Coffee[] = [];

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit() {
    this.getCoffees();
  }

  getCoffees(): void {
    this.coffeeService.getCoffees()
      .subscribe((coffees: Coffee[]) => this.coffees = coffees.slice(1, 5));
  }
}