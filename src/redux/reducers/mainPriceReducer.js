const initialState = {
    dataPrice: [],
    isLoaded: false
};
const mainPriceReducer = (state = initialState, action) =>{
    switch(action.type) {
        case "mainPrice/MAIN_PRICE_DATA_SUCCESS":
            return  {
                ...state,
                dataPrice: action.payload,
                isLoaded: true
            };
        default: return state;
    };
};
export {mainPriceReducer};