const initialState ={
    last24hourPrice: [],
    isLoaded: false
};
const last24hourPriceReducer = (state = initialState, action) =>{
    switch(action.type) {
        case "last24hourPrice/LAST24HOUR_PRICE_DATA_SUCCESS":
            return  {
                ...state,
                last24hourPrice: action.payload,
                isLoaded: true
            };
        default: return state;
    };
};
export {last24hourPriceReducer};