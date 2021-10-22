import {Injectable} from  '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators'
import { Customer } from '../customers.model';

import {CustomerService} from '../customers.service';
import * as customerAction from '../state/customers.actions';
@Injectable()
export class CustomerEffect {
    constructor(
        private actions$: Actions,
        private customerService: CustomerService
    ){}
    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType<customerAction.LoadCustomers>(
            customerAction.CustomerActionType.LOAD_CUSTOMERS
        ),
        mergeMap((Actions: customerAction.LoadCustomers) => 
            this.customerService.getCustomers().pipe(
                map(
                    (customers: Customer[]) => 
                    new customerAction.LoadCustomersSuccess(customers)
                ),
                catchError(err => of(new customerAction.LoadCustomersFail(err)))
            )
        )
    )
    
}