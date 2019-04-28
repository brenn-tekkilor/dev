import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '../model/store';
import { Cashier } from '../model/cashier';
import { Register } from '../model/register';

@Injectable()
export class ShopService {
  // Define the routes we are going to interact with
  private shopStoresURL = 'http://localhost:3001/api/shop';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getShopStores() {
    return this.http
    .get<Store[]>((this.shopStoresURL + '/stores'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
