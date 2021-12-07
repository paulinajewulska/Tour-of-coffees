import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Coffee } from '../models/coffee';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private coffeesUrl = 'api/coffees';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(this.coffeesUrl)
      .pipe(tap(_ => this.log('fetched coffees')),
        catchError(this.handleError<Coffee[]>('getCoffees', []))
      );
  }

  getCoffee(id: number): Observable<Coffee> {
    const url = `${this.coffeesUrl}/${id}`;
    return this.http.get<Coffee>(url).pipe(
      tap(_ => this.log(`fetched coffee id=${id}`)),
      catchError(this.handleError<Coffee>(`getCoffee id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`CoffeeService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateCoffee(coffee: Coffee): Observable<any> {
    return this.http.put(this.coffeesUrl, coffee, this.httpOptions).pipe(
      tap(_ => this.log(`updated coffee id=${coffee.id}`)),
      catchError(this.handleError<any>('updateCoffee'))
    );
  }

  addCoffee(coffee: Coffee): Observable<Coffee> {
    return this.http.post<Coffee>(this.coffeesUrl, coffee, this.httpOptions).pipe(
      tap((newCoffee: Coffee) => this.log(`added coffee w/ id=${newCoffee.id}`)),
      catchError(this.handleError<Coffee>('addCoffee'))
    );
  }

  searchCoffees(term: string): Observable<Coffee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Coffee[]>(`${this.coffeesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found coffees matching "${term}"`) :
        this.log(`no coffees matching "${term}"`)),
      catchError(this.handleError<Coffee[]>('searchCoffees', []))
    );
  }
}
