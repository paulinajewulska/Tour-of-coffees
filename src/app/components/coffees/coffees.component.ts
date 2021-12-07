import { Component, OnInit } from '@angular/core';
import { Coffee } from 'src/app/models/coffee';
import { CoffeeService } from 'src/app/services/coffee.service';
import { MessageService } from 'src/app/services/message.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.css']
})
export class CoffeesComponent implements OnInit {
  coffees: Coffee[] = [];
  myCoffees = 'My coffees';
  addCoffee = 'Add coffee';
  coffeeNameLabel = 'Coffee name:';

  constructor(private coffeeService: CoffeeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCoffees();
  }

  getCoffees(): void {
    this.coffeeService.getCoffees().subscribe((data: Coffee[]) => {
      this.coffees = data;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.coffeeService.addCoffee({ name } as Coffee)
      .subscribe(coffee => {
        this.coffees.push(coffee);
      });
  }
}
