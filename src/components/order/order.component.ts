import { Component } from '@angular/core';
import { PageLayoutComponent } from "../page-layout/page-layout.component";
import { FormsModule } from '@angular/forms';
import { OrderServiceService } from '../../../services/order-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [PageLayoutComponent, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  deliveryLocation?: string;
  deliveryTime?: string;
  groupOrderId?: number;
  constructor(private _orderService : OrderServiceService, private router: Router) {
    this._orderService.createGroupOrderResponse.subscribe(id => {
      this.groupOrderId = id;
      if (this.groupOrderId) {
        console.log("Group order created with ID: " + this.groupOrderId)
        this.joinGroup();
      }
    })
    this._orderService.joinGroupOrderResponse.subscribe(response => {
      if (response) {
        console.log("Joined group order with ID: " + response.groupOrderId)
        this.router.navigate(["order-dashboard", response.groupOrderId, "johndoe", this.deliveryTime ? this.deliveryTime : "undefined"])
      }
    })
  }
  submit() {
    if (this.deliveryTime) {
      console.log("Delivery time defined")
      this._orderService.createGroupOrder({currentDate: new Date().toISOString().slice(0,16), deliveryLocation: this.deliveryLocation, deliveryTime: this.deliveryTime}, true)
    } else {
    console.log("Delivery time not defined")
    this._orderService.createGroupOrder({currentDate: new Date().toISOString().slice(0,16), deliveryLocation: this.deliveryLocation}, false)
    }
  }

  joinGroup() {
    this._orderService.joinGroupOrder({groupOrderId: this.groupOrderId, username: "johndoe"})
  }
}
