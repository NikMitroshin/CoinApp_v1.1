const initialState = {
    priceForChart: [],
    isLoaded: false
};
const priceForChartReducer = (state = initialState, action) =>{
    switch(action.type) {
        case "priceForChart/PRICEFORCHART_PRICE_DATA_SUCCESS":
            return  {
                ...state,
                priceForChart: action.payload,
                isLoaded: true
            };
        default: return state;
    };
};
export {priceForChartReducer};