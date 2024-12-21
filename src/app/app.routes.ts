import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from '../components/order/order.component';
import { OrderDashboardComponent } from '../components/order-dashboard/order-dashboard.component';
import { IndividualOrderComponent } from '../components/individual-order/individual-order.component';
import { OrderValidatedComponent } from '../components/order-validated/order-validated.component';
import { RestaurantManagerComponent } from '../components/restaurant-manager/restaurant-manager.component';
import { MenuComponent } from '../components/menu/menu.component';

export const routes: Routes = [
    {path: "", component: RestaurantManagerComponent},
    {path: "order", component: OrderComponent},
    {path: "order-dashboard/:id/:username/:deliveryTime", component: OrderDashboardComponent},
    {path: "individual-order/:deliveryTime", component: IndividualOrderComponent},
    {path: "order-success", component: OrderValidatedComponent },
    {path: "menu/:restaurantName", component: MenuComponent}
];
