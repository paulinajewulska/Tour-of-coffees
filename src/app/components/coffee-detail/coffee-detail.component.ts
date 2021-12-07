import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from 'src/app/models/coffee';
import { CoffeeService } from 'src/app/services/coffee.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coffee-detail',
  templateUrl: './coffee-detail.component.html',
  styleUrls: ['./coffee-detail.component.css']
})
export class CoffeeDetailComponent implements OnInit {
  @Input() coffee?: Coffee;
  constructor(private route: ActivatedRoute,
    private coffeeService: CoffeeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCoffee();
  }

  getCoffee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coffeeService.getCoffee(id)
      .subscribe(coffee => this.coffee = coffee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.coffee) {
      this.coffeeService.updateCoffee(this.coffee)
        .subscribe(() => this.goBack());
    }
  }
}
