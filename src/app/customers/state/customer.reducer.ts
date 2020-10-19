import * as customerActions from './customer.actions';
import { Customer } from "../customer.model";
import * as fromRoot from "../../state/app.state";

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

// export interface CustomerState {
//     customers: Customer[],
//     loading:boolean,
//     loaded:boolean,
//     error:string;
// }
export interface CustomerState extends EntityState<Customer> {
    selectedCustomerId: number | null;
    loading: boolean,
    loaded: boolean,    
    error: string;
}
export interface AppState extends fromRoot.AppState {
    customers: CustomerState;
}

//creating instance of an entityAdapter this will provide us with useful method that we need
export const customerAdaptor: EntityAdapter<Customer> = createEntityAdapter<Customer>();

//Default Customer with some initialValues
export const defaultCustomer: CustomerState = {
    ids: [],
    entities: {},
    selectedCustomerId: null,
    loading: false,
    loaded: false,
    error: ""
}
/* export const initialState : CustomerState = {
//     customers:[],
//     loaded:false,    
//     loading:false,
//     error:''
// }*/

//Assigning defaultCustomer to initialstate using the getInitialState from the adaptor and passing in the defaault customer
export const initialState: CustomerState = customerAdaptor.getInitialState(defaultCustomer);


export function customerReducer(state = initialState, action: customerActions.Action): CustomerState {
    switch (action.type) {
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            /*we can now use the addAll method to add the customers from the action.payload to the store.
            //and adding any property that we want to update.*/
            // return{
            //     ...state,
            //     loading:false,
            //     loaded:true,
            //     customers:action.payload
            // }
            return customerAdaptor.setAll(action.payload, {
                ...state,
                loaded: true,
                loading: false
            })
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
            return {
                ...state,
                // customers:[],
                entities: {},
                loaded: false,
                loading: false,
                error: action.payload
            }
        }

        /**For Load Customer */
        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
            return customerAdaptor.addOne(action.payload, {
                ...state,
                // selectedCustomerId is needed when we load the customer in the edit customer component
                selectedCustomerId: action.payload.id
            })
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        /**For Create Customer */
        case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
            return customerAdaptor.addOne(action.payload, state)
        }
        case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        /**For Update Customer */
        case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
            return customerAdaptor.updateOne(action.payload, state)
        }
        case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        /**For Delete Customer */
        case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
            return customerAdaptor.removeOne(action.payload, state)
        }
        case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }


        default: {
            return state;
        }
    }
}


/**We are going to define a feature selector for the customer slice of state and we are going to assign to it 
 the slice of state that we want by using the createFeatureSelector functn passing in the name of slice **/
const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customers"
)
/**now we can create selectors with the specific properties we want
we do that by using createSelector method passing tin the feature state we just defined and the specific
 property we want to get in this case the customer property**/
export const getCustomer = createSelector(
    getCustomerFeatureState,
    //now we have to use the getSelectorsFunction provided by the entity adaptor to get the propertiess we want from the state
    customerAdaptor.getSelectors().selectAll
    // (state: CustomerState) => state.customers
)

export const getCustomerLoading = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loading
)

export const getCustomerLoaded = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loaded
)

export const getError = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.error
)

/**Adding two selectors that we need to load the selective customer in the edit component 
 * creating a selector to get the current customerid 
*/
export const getCurrentCustomerId = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.selectedCustomerId
)
/**Now we can get the currentCustomer by passing featureState,the current customer id and the entity that corresponds to that id */
export const getCurrentCustomer = createSelector(
    getCustomerFeatureState,
    getCurrentCustomerId,
    state => state.entities[state.selectedCustomerId]
)

























// const initialState ={
//     customers:[
//         {
//             name:"Harsh",
//             phone:"1234567890",
//             address:"rz",
//             membership:"Platinum",
//             id:1
//         }
//     ],
//     loading:false,
//     loaded:true
// }


// export function customerReducer(state = initialState,action){
//     switch(action.type){
//         case "LOAD_CUSTOMERS":{
//             return {
//                 ...state,
//                 loading:true,
//                 loaded:false
//             };
//         }

//         default:{
//             return state;
//         }
//     }

// }