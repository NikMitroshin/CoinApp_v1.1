import axios from 'axios';

//запрос текущих цен
export const mainPriceDataSuccess = (dataPrice) => {
    return {
        type: "mainPrice/MAIN_PRICE_DATA_SUCCESS",
        payload: dataPrice
    };
};
export const mainPriceData = (url) => {
    return (dispatch)=>{
        (async () => {
            const response = await axios.get(url);
            dispatch(mainPriceDataSuccess(response.data));
        })();
    };
};

// запросы цен 24 часовой давности
export const last24hourPriceDataSuccess = (price) => {
    return {
        type: "last24hourPrice/LAST24HOUR_PRICE_DATA_SUCCESS",
        payload: price
    };
};
export const last24hourPriceData = (arrUrl) => {
    return (dispatch)=>{

        (async () => {
            let priceCoin24hour = [];
            for (const item of arrUrl) {
                let response = await axios.get(item);
                priceCoin24hour.push(response.data.Data.Data[0].close);
            };
            dispatch(last24hourPriceDataSuccess(priceCoin24hour));
        })();
    };
};

// запросы данных для графиков
export const priceForChartSuccess = (dataPrice) => {
    return {
        type: "priceForChart/PRICEFORCHART_PRICE_DATA_SUCCESS",
        payload: dataPrice
    };
};
export const priceForChartData = (url) => {
    return (dispatch) => {
        (async () => {
            const response = await axios.get(url);
            dispatch(priceForChartSuccess(response.data.Data.Data))
        })();
    };
};




