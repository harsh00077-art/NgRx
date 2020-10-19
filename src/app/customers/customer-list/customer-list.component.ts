import { Component, OnInit } from '@angular/core';
import { Store,select } from "@ngrx/store"
import * as customerActions from '../state/customer.actions';

import { Observable } from "rxjs";
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers$:Observable<Customer[]>;
  error$:Observable<string>
  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    // this.store.subscribe(state => (this.customers = state.customers.customers));
    //subscribe to the selector we created before using the this.store.pipe method and selecting the selector we created
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomer));
    /**Subscribing to the getError selector  */
    this.error$ = this.store.pipe(select(fromCustomer.getError))
  }

  deleteCustomer(customer: Customer){
    if(confirm("Are you sure you want to delete the USer?")){
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer){
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
 