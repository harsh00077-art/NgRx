import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from "rxjs/operators";
import { CustomerService } from '../customer.service';
import * as customerActions from '../state/customer.actions';
import { Customer } from "../customer.model";

@Injectable()
export class CustomerEffect {
    constructor(
        private actions$: Actions,
        private customerService: CustomerService
    ) { }

    @Effect() // we need to listen for the action, cummunicate with the server, and dispatch a new action with the data we get from the server.
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        //specifying the ype of action we want to listen for
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),//the when action is dispatched we want to map over the action aand we are goin to use the servide to get customers from the servers,then we are going to map the data we get from the server
        mergeMap((action: customerActions.LoadCustomers) =>
            this.customerService.getCustomers().pipe(
                map((customers: Customer[]) =>
                    new customerActions.LoadCustomersSuccess(customers)
                ),
                catchError(err => of(new customerActions.LoadCustomersFail(err)))
            )
        )
    );

    @Effect() // we need to listen for the action, cummunicate with the server, and dispatch a new action with the data we get from the server.
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        //specifying the ype of action we want to listen for
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ),//the when action is dispatched we want to map over the action aand we are goin to use the servide to get customers from the servers,then we are going to map the data we get from the server
        mergeMap((action: customerActions.LoadCustomer) =>
            this.customerService.getCustomerById(action.payload).pipe(
                map((customer: Customer) =>
                    new customerActions.LoadCustomerSuccess(customer)
                ),
                catchError(err => of(new customerActions.LoadCustomerFail(err)))
            )
        )
    );

    @Effect() // we need to listen for the action, cummunicate with the server, and dispatch a new action with the data we get from the server.
    createCustomer$: Observable<Action> = this.actions$.pipe(
        //specifying the ype of action we want to listen for
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ),//the when action is dispatched we want to map over the action aand we are goin to use the servide to get customers from the servers,then we are going to map the data we get from the server
        map((action: customerActions.CreateCustomer) => action.payload),
        mergeMap((customer: Customer) =>
            this.customerService.createCustomer(customer).pipe(
                map((newCustomer: Customer) =>
                    new customerActions.CreateCustomerSuccess(newCustomer)
                ),
                catchError(err => of(new customerActions.CreateCustomerFail(err)))
            )
        )
    );

    @Effect() // we need to listen for the action, cummunicate with the server, and dispatch a new action with the data we get from the server.
    updateCustomer$: Observable<Action> = this.actions$.pipe(
        //specifying the ype of action we want to listen for
        ofType<customerActions.UpdateCustomer>(
            customerActions.CustomerActionTypes.UPDATE_CUSTOMER
        ),//the when action is dispatched we want to map over the action aand we are goin to use the servide to get customers from the servers,then we are going to map the data we get from the server
        map((action: customerActions.UpdateCustomer) => action.payload),
        mergeMap((customer: Customer) =>
            this.customerService.updateCustomer(customer).pipe(
                map((updateCustomer: Customer) =>
                    new customerActions.UpdateCustomerSuccess({
                        id: updateCustomer.id,
                        changes:updateCustomer
                    })
                ),
                catchError(err => of(new customerActions.UpdateCustomerFail(err)))
            )
        )
    );

    @Effect() // we need to listen for the action, cummunicate with the server, and dispatch a new action with the data we get from the server.
    deleteCustomer$: Observable<Action> = this.actions$.pipe(
        //specifying the ype of action we want to listen for
        ofType<customerActions.DeleteCustomer>(
            customerActions.CustomerActionTypes.DELETE_CUSTOMER
        ),//the when action is dispatched we want to map over the action aand we are goin to use the servide to get customers from the servers,then we are going to map the data we get from the server
        map((action: customerActions.DeleteCustomer) => action.payload),
        mergeMap((id: number) =>
            this.customerService.deleteCustomer(id).pipe(
                map(() => new customerActions.DeleteCustomerSuccess(id)
                ),
                catchError(err => of(new customerActions.DeleteCustomerFail(err)))
            )
        )
    );


}