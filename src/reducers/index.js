import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer'
import { cartReducer } from './cartReducer'
import { drawerReducer } from './drawerReducer'
import { couponReducer } from './couponReducer'
import { cashPaymentReducer } from './cashPaymentReducer'
import {venmoPaymentReducer} from './venmoPaymentReducer'

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    cash: cashPaymentReducer,
    venmo: venmoPaymentReducer
})

export default rootReducer;