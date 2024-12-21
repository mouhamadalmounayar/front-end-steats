import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from "../page-layout/page-layout.component";
import { RestaurantService } from '../../../services/restaurant.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-restaurant-manager',
  standalone: true,
  imports: [PageLayoutComponent, NgForOf, RouterLink, FormsModule],
  templateUrl: './restaurant-manager.component.html',
  styleUrl: './restaurant-manager.component.css'
})
export class RestaurantManagerComponent implements OnInit {
  restaurants?: any[] | null;
  restaurantName?: string;
  filteredRestaurants?: any[]|null;
  constructor(private _restaurantService: RestaurantService){
    this._restaurantService.restaurants$.subscribe((data) => {
      if(data){
        this.restaurants = data;
        this.filteredRestaurants = this.restaurants;
      }
    })
  }
  ngOnInit(): void {
    this._restaurantService.getRestaurants();
  }

  onRestaurantNameChange() {
    if (this.restaurantName) {
      this.filteredRestaurants = this.restaurants?.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.restaurantName!.toLowerCase())
      );
    } else {
      this.filteredRestaurants = this.restaurants;
    }
  }
}
