import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  apiUrl = 'http://localhost:8002/api/';
  createGroupOrderDefinedDeliveryTimeUrl =
    this.apiUrl + 'orders/group-orders/create-group-with-delivery';
  createGroupOrderUndefinedDeliveryTimeUrl =
    this.apiUrl + 'orders/group-orders/create-group-undefined-delivery';
  joinGroupOrderUrl = this.apiUrl + 'orders/group-orders/join-group';
  createGroupOrderResponse: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  joinGroupOrderResponse: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectRestaurantDefinedDeliveryTimeUrl =
    this.apiUrl + 'orders/group-orders/select-restaurant-defined-delivery'
  selectRestaurantUnDefinedDeliveryTimeUrl = this.apiUrl + 'orders/group-orders/select-restaurant-undefined-delivery'
  selectRestaurantResponse: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  addItemsUrlDefinedDelivery = this.apiUrl +'orders/group-orders/add-menu-items-defined-delivery';
  addItemsUrlUndefinedDelivery = this.apiUrl + 'orders/group-orders/add-menu-items-undefined-delivery';
  addItemsResponse: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  processPaymnentUrl =
    this.apiUrl + 'orders/group-orders/process-payment-individual';
  processPaymentResponse: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  postProcessUrlDefinedDelivery =
    this.apiUrl + 'orders/group-orders/post-payment-defined-delivery-time';
  postProcessUrlUndefinedDelivery =
    this.apiUrl + 'orders/group-orders/post-payment-undefined-delivery-time';
  postProcessResponse: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  createGroupOrder(paramsObj: any, deliveryTimeDefined: boolean): void {
    let params = new HttpParams();
    for (const key in paramsObj) {
      // Corrected from 'params' to 'paramsObj'
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    if (deliveryTimeDefined) {
      this.http
        .post<number>(
          this.createGroupOrderDefinedDeliveryTimeUrl,
          {},
          httpOptions
        )
        .subscribe((response) => {
          this.createGroupOrderResponse.next(response);
        });
    } else {
      this.http.post<number>(this.createGroupOrderUndefinedDeliveryTimeUrl, {}, httpOptions).subscribe((response) => {
        this.createGroupOrderResponse.next(response);
      });
    }
  }

  joinGroupOrder(paramsObj: any): void {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    this.http
      .post(this.joinGroupOrderUrl, {}, httpOptions)
      .subscribe((response) => {
        this.joinGroupOrderResponse.next(response);
      });
  }

  selectRestaurant(paramsObj: any, deliveryTimeDefined: boolean): void {
    console.log('paramsObj', paramsObj);
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    if (deliveryTimeDefined) {
      this.http
        .post(this.selectRestaurantDefinedDeliveryTimeUrl, {}, httpOptions)
        .subscribe((data) => {
          this.selectRestaurantResponse.next(data);
        });
    } else {
      this.http.post(this.selectRestaurantUnDefinedDeliveryTimeUrl, {}, httpOptions).subscribe((data) => {
        this.selectRestaurantResponse.next(data);
      });
    }
  }

  addItems(paramsObj: any, body: any, definedUrl: boolean) : void {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    if (definedUrl){
      this.http.post(this.addItemsUrlDefinedDelivery, body, httpOptions).subscribe((data) => {
        this.addItemsResponse.next(data);
      });
    }
    else {
      this.http.post(this.addItemsUrlUndefinedDelivery, body, httpOptions).subscribe((data) => {
        this.addItemsResponse.next(data);
      });
    }
  }

  pay(paramsObj: any): void {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    this.http
      .post(this.processPaymnentUrl, {}, httpOptions)
      .subscribe((data) => {
        this.processPaymentResponse.next(data);
      });
  }

  postPayment(paramsObj: any, deliveryTimeDefined: boolean): void {
    console.log("Called")
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    if (deliveryTimeDefined) {
      this.http
        .post(this.postProcessUrlDefinedDelivery, {}, httpOptions)
        .subscribe((data) => {
          this.postProcessResponse.next(data);
        });
    } else {
      this.http.post(this.postProcessUrlUndefinedDelivery, {}, httpOptions).subscribe((data) => {
        this.postProcessResponse.next(data);
      });
    }
  }
}
