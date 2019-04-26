import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { Store } from '../store';
import { Register } from '../register';
import { Cashier } from '../cashier';
import { Time } from '@angular/common';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit, OnDestroy {
  storesSub: Subscription;
  stores: Store[];
  registers: Register[];
  cashiers: Cashier[];
  targetStore: Store;
  targetRegister: Register;
  targetCashier: Cashier;
  error: any;
  date: Date = new Date();
  serial1: number;
  serial2: number;
  serial1A = 0.000083659;
  serial1B = 0.13384;
  serial1C = -61.3756;
  serial1Margin = 22.28;
  serial1X: number;



  iShopForm = new FormGroup({
    store: new FormControl('', Validators.required),
    register: new FormControl('', Validators.required),
    cashier: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    serial1: new FormControl('', Validators.required),
    serial2: new FormControl('', Validators.required)
  });

  constructor(
    public authService: AuthService,
    public shopService: ShopService,
  ) { }

  ngOnInit() {
    this.storesSub = this.shopService
      .getShopStores()
      .subscribe(
        stores => this.stores = stores,
        err => (error: any) => this.error = err);
    }

  ngOnDestroy() {
    this.storesSub.unsubscribe();
    }

  onChanges( event: any): void {
      const target = event.target || event.srcElement || event.currentTarget;
      const name = target.attributes.name.nodeValue;
      if (name === 'store') {
        this.targetStore = this.stores[target.selectedIndex - 1];
        const r: Register[] = [];
        for (const i of this.targetStore.registers) {
          if (i.registerId < 20 || i.registerId >= 500) {
            r.push(i);
          }
        }
        this.registers = r;
      } else if (name === 'register') {
        this.targetRegister = this.registers[target.selectedIndex - 1];
        this.cashiers = this.targetRegister.cashiers;
      } else if (name === 'cashier') {
        this.targetCashier = this.cashiers[target.selectedIndex - 1];
      } else if (name === 'time') {
        const hours: number = parseInt(target.value.substr(0, 2), 10);
        const minutes: number = parseInt(target.value.slice(-2), 10);
        this.serial1X = (hours * 60) + minutes;
        this.serial1 = Math.round(this.serial1A * (this.serial1X ** 2) +
          (this.serial1B * this.serial1X) +
          (this.serial1C) +
          (Math.floor(Math.random() * (22.28 - -(22.28) + 1) ) + -(22.28)));
        if (this.targetRegister.registerId >= 500) {
          this.serial2 = 999999000 + this.targetRegister.registerId;
        } else if (this.targetRegister.registerId < 20) {
          if (this.serial1 < 120) {
            this.serial2 = Math.round(Math.floor(Math.random() * ((this.serial1 + 30) - 20 + 1)) + 20);
          } else if (this.serial1 >= 120) {
            this.serial2 = Math.round(Math.floor(Math.random() * ((this.serial1 + 30) - (this.serial1 - 100) + 1)) + (this.serial1 - 100));
          }
        }
      }
  }
}
