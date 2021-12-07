import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Coffee } from '../models/coffee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const coffees = [
      { id: 11, name: 'Honduras el Tontolo' },
      { id: 12, name: 'Salwador Finga Las Brisas' },
      { id: 13, name: 'Kenia Mutangati' },
      { id: 14, name: 'Brazylia Sapucai Valley' },
      { id: 15, name: 'Kolumbia Finca Llamadas' },
      { id: 16, name: 'Kolumbia Finca El Corozal' },
      { id: 17, name: 'Gwatemala Los Robles' },
      { id: 18, name: 'Meksyk Onix Organic' },
      { id: 19, name: 'Panama Finca Quiros' },
      { id: 20, name: 'Forza Blend' }
    ];
    return { coffees };
  }

  genId(coffees: Coffee[]): number {
    return coffees.length > 0 ? Math.max(...coffees.map(coffee => coffee.id)) + 1 : 11;
  }
}