import { combineReducers } from 'redux';
import {mainPriceReducer} from './mainPriceReducer.js';
import { last24hourPriceReducer } from './last24hourReducer.js';
import { priceForChartReducer} from './priceForChartReducer.js';

const rootReducer = combineReducers({
    mainPriceReducer,
    last24hourPriceReducer,
    priceForChartReducer
});

export default rootReducer;





