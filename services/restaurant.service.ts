import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl : string = "http://localhost:8002/api"
  restaurants$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) { }
  getRestaurants(): void {
    this.http.get(this.apiUrl + "/browse-menu/restaurants").subscribe((data: any) => {
      this.restaurants$.next(data)
    })
  }
}
