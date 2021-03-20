export const cashPaymentReducer = (state = false, action) => {
    switch (action.type) {
        case "CASH_PAYMENT":
            return action.payload;
        default:
            return state;
    }
};
