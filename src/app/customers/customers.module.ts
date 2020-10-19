import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { customerReducer } from './state/customer.reducer';

import { EffectsModule , Actions } from "@ngrx/effects";
import { CustomerEffect } from "./state/customer.effects";

const customerRoutes: Routes = [{path:"", component:CustomerComponent}];

@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerEditComponent, CustomerListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(customerRoutes),
    //name of the slice of the state is customers and customerReducer will manage this piece of slice
    StoreModule.forFeature("customers",customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomersModule { }