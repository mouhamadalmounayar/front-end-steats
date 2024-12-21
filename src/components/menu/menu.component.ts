import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from "../page-layout/page-layout.component";
import {NgIf, NgForOf} from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PageLayoutComponent, NgForOf, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  restaurants?: any[] | null;
  restaurantName?: string | null;
  menuItems?: any[] | null;
    constructor(private _restaurantService: RestaurantService, private route : ActivatedRoute){
      this._restaurantService.restaurants$.subscribe((data) => {
        if(data){
          this.restaurants = data;
          console.log("Restaurants")
          console.log(data)
          const restaurant = data.find((restaurant) => {
            return restaurant.name=== this.restaurantName
          });
          if(restaurant){
            console.log("We are here")
            this.menuItems = restaurant.menuItems;
            console.log(this.menuItems)
          }
        }
      })
    }
    ngOnInit(): void {
      this.restaurantName = this.route.snapshot.paramMap.get("restaurantName");
      this._restaurantService.getRestaurants();
    }
}
