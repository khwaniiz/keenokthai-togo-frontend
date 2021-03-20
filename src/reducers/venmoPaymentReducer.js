export const venmoPaymentReducer = (state = false, action) => {
    switch (action.type) {
        case "VENMO_PAYMENT":
            return action.payload;
        default:
            return state;
    }
};
