import * as customerActions from './customers.actions';
import {EntityState, EntityAdapter, createEntityAdapter} from  '@ngrx/entity';
import {Customer} from '../customers.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app-state';
export interface CustomerState extends EntityState<Customer>{
    selectedCustomerId: number | null,
    loading: boolean,
    loaded:boolean,
    error: string
}
export interface AppState extends fromRoot.AppState{
    customers: CustomerState
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const defaultCustomer: CustomerState = {
    ids:[],
    entities: {},
    selectedCustomerId: null,
    loading: false,
    loaded: false,
    error:''
}
export const initialState = customerAdapter.getInitialState(defaultCustomer);
export function customerReducer(
      state= initialState,
     action: customerActions.Actions
     ): CustomerState{
         switch(action.type){
             case customerActions.CustomerActionType.LOAD_CUSTOMERS: {
                 return{
                     ...state,
                     loading: true
                 }
             }
             case customerActions.CustomerActionType.LOAD_CUSTOMERS_SUCCESS: {
                 return customerAdapter.addMany(action.payload, {
                     ...state,
                     loading: false,
                     loaded: true
                 })
             }
             case customerActions.CustomerActionType.LOAD_CUSTOMERS_FAIL: {
                 return {
                     ...state,
                     entities: {},
                     loaded: false,
                     loading: false,
                     error: action.payload
                 }
             }
             default :{
                 return state;
             }
         }
     }
     const getCustomerFeatureState = createFeatureSelector<CustomerState>(
         'customers'
     )
     export const getCustomers = createSelector(
         getCustomerFeatureState,
         customerAdapter.getSelectors().selectAll
     )
     export const getCustomersLoading = createSelector(
        getCustomerFeatureState,
        (state: CustomerState) => state.loading
    )
    export const getCustomersLoaded = createSelector(
        getCustomerFeatureState,
        (state: CustomerState) => state.loaded
    )
    export const getCustomersError = createSelector(
        getCustomerFeatureState,
        (state: CustomerState) => state.error
    )