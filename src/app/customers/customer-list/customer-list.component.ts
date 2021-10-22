import { Component, OnInit } from '@angular/core';

import {Store, select} from '@ngrx/store';


import * as customerActins from '../state/customers.actions';
import * as fromCustomer from '../state/customers.reducer';
import {Customer} from '../customers.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customers$:any;//Observable<Customer[]>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new customerActins.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers))
  }

}
