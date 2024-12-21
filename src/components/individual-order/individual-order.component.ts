import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PageLayoutComponent } from "../page-layout/page-layout.component";
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant.service';
import { OrderServiceService } from '../../../services/order-service.service';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  name: string;
  preparationTimeInSeconds: number;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-individual-order',
  standalone: true,
  imports: [PageLayoutComponent, FormsModule, NgForOf, NgIf],
  templateUrl: './individual-order.component.html',
  styleUrl: './individual-order.component.css'
})
export class IndividualOrderComponent implements OnInit {
  restaurantName?: string | null;
  restaurants?: any[] | null;
  deliveryTime?: string | null;
  capacity?: number;
  menuItems?: any[] | null;
  cart: MenuItem[] = [];
  constructor(private _restaurantService: RestaurantService, private _orderService : OrderServiceService, private route: ActivatedRoute, private router: Router) {
    this._restaurantService.restaurants$.subscribe((data: any) => {
      this.restaurants = data;
    })
    this._orderService.selectRestaurantResponse.subscribe((data) => {
      console.log("Received menu items", data)
      if (data){
        console.log("We are here")
        if (this.deliveryTime != "undefined"){
          this.menuItems = data.menuItems;
          this.capacity = data.capacity;
        }
        else {
          this.menuItems = data;
        }
      }
    })
    this._orderService.addItemsResponse.subscribe((data) => {
      if (data){
        console.log("Items added", data)
        this.processPayment();
      }
    })
    this._orderService.processPaymentResponse.subscribe((data) => {
      console.log(data)
      if (data){
        console.log("Payment processed", data)
        this.postProcess();
      }
    })
    this._orderService.postProcessResponse.subscribe((data) => {
      if (data){
        console.log("Reached successfully")
        this.router.navigate(["/order-success"])
      }
    })
  }
  ngOnInit(): void {
    this._restaurantService.getRestaurants()
    this.deliveryTime = this.route.snapshot.paramMap.get("deliveryTime");
  }

  getMenuItems(restaurantName: string): void {
    if (this.deliveryTime != "undefined"){
      this._orderService.selectRestaurant({restaurantName: restaurantName, username: "johndoe"}, true)
    }
    else{
      this._orderService.selectRestaurant({restaurantName: restaurantName, username: "johndoe"}, false)
    }
  }


  generateBody(){
    let body = []
    // iterate over menuItems in the cart
    for (const menuItem of this.cart){
      body.push({
        menuItem: {
          price: menuItem.price,
          preparationTimeInSeconds: menuItem.preparationTimeInSeconds,
          name: menuItem.name
        },
        quantity : menuItem.quantity
      })
    }
    return body
  }

  chooseMenuItem(menuItemName: string): void {
    if (!this.capacity){
      this.capacity = Number.MAX_SAFE_INTEGER;
    }

    // Find the menu item from the available menu items
    const menuItem = this.menuItems?.find(item => item.name === menuItemName);
  
    if (!menuItem) {
      console.error(`Menu item ${menuItemName} not found`);
      return;
    }
  
    // Check if the item is already in the cart
    const cartItem = this.cart.find(item => item.name === menuItemName);
  
    // Check if adding the item exceeds the capacity
    if ((this.capacity || 0) - menuItem.preparationTimeInSeconds < 0) {
      console.error(`Cannot add ${menuItemName}. Capacity exceeded.`);
      return;
    }
  
    if (cartItem) {
      // Increment the quantity of the item in the cart
      cartItem.quantity += 1;
    } else {
      // Add the new item to the cart
      this.cart.push({
        name: menuItem.name,
        preparationTimeInSeconds: menuItem.preparationTimeInSeconds,
        quantity: 1,
        price: menuItem.price
      });
    }
  
    // Deduct the preparation time of the added item from the capacity
    this.capacity = (this.capacity || 0) - menuItem.preparationTimeInSeconds;
  
    console.log(`Menu item ${menuItemName} added to the cart.`, this.cart);
    console.log(`Remaining capacity: ${this.capacity}`);
  }

  addItems(): void {
    console.log("BODY", this.generateBody())
    if (this.deliveryTime != "undefined"){
      this._orderService.addItems({username:"johndoe"}, this.generateBody(), true)
    } else {
      this._orderService.addItems({username:"johndoe"}, this.generateBody(), false)
    }
  }

  processPayment(): void {
      this._orderService.pay({username: "johndoe"})
  }

  postProcess(): void {
    if (this.deliveryTime != "undefined")
      this._orderService.postPayment({username: "johndoe"}, true)
    else this._orderService.postPayment({username: "johndoe"}, false)
  }
  
}
