import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from "../page-layout/page-layout.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [PageLayoutComponent, RouterLink],
  templateUrl: './order-dashboard.component.html',
  styleUrl: './order-dashboard.component.css'
})
export class OrderDashboardComponent implements OnInit {
  deliveryTime?: string | null;
  username?: string | null;
  id?: string | null;
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
      this.deliveryTime = this.route.snapshot.paramMap.get("deliveryTime")
      this.username = this.route.snapshot.paramMap.get("username")
      this.id = this.route.snapshot.paramMap.get("id");
  }
}
