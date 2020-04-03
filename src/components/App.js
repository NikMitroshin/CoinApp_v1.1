import React, { useEffect } from 'react';
import '../styles/App.css';
import {Route} from 'react-router-dom';
import Main from './Pages/Main.js'
import Details from './Pages/Details.js'
import { useSelector, useDispatch } from 'react-redux';
import { mainPriceData } from '../redux/actions/actions.js';
import { last24hourPriceData } from '../redux/actions/actions.js'
// основа - получаю данные, отправляю в редакс
// настраиваю роуты -главная или детали (3 штуки)

const App = () => {
    const dispatch = useDispatch();
    useEffect ( () => {
        const requestUrl = 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,XRP';
        const arrUrl = ['https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=24']; 
        dispatch(mainPriceData(requestUrl));
        dispatch(last24hourPriceData(arrUrl))
    },[]);
    
    const dataPriceHook = useSelector( (state) => state.mainPriceReducer.dataPrice);
    const dataPriceLoad = useSelector( (state) => state.mainPriceReducer.isLoaded);
    const last24hourPriceHook = useSelector( (state) => state.last24hourPriceReducer.last24hourPrice);
    const last24hourPriceLoad = useSelector( (state) => state.last24hourPriceReducer.isLoaded);

    if (dataPriceLoad && last24hourPriceLoad) { // рендер при получении всех данных
        // тут рассчеты изменений за 24 часа в процентах и долларах (это буду кидать через пропсы, чтобы не повторять логику расчетов) 
        const changePrice =[]; // заношу проценты изменений
        let totalChangeUSD = 0;
        const dataPrice = Object.entries(dataPriceHook)
        dataPrice.forEach((item, index) => {
            changePrice.push( ((1/item[1] - last24hourPriceHook[index]) / last24hourPriceHook[index] * 100).toFixed(2) ); // закидываю проценты по всем коинам
            totalChangeUSD += (1/item[1] - last24hourPriceHook[index]); // изменение в долларах по всем в сумме
        });

        const createRoute = () => {
        return dataPrice && dataPrice.map ((item, index) => (
            <Route
                key = {index}
                path={'/coin'+ (index + 1)}
                exact
                component = {() => <Details coinId={index} coinName={item} changePrice={changePrice}/> }
            />
            ));
        };

        return(
            <section className="block-main">
                <div className="block-wrapper">
                    <Route
                        path='/'
                        exact
                        component = {() => <Main changePrice={changePrice} totalChangeUSD={totalChangeUSD}/>}
                    />
                    {createRoute()}
                </div>
            </section>
        ); 
    } else { return ( <h2 className="warning">Please, wait</h2>) }
};
    

export default App;
