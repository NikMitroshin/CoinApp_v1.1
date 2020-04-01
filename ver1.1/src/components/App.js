import React, { useEffect } from 'react';
import '../styles/App.css';
import {Route} from 'react-router-dom';
import Main from './Pages/Main.js'
import Details from './Pages/Details.js'
import { connect } from 'react-redux';
import { mainPriceData } from '../redux/actions/actions.js';
import { last24hourPriceData } from '../redux/actions/actions.js'
// основа - получаю данные, отправляю в редакс
// настраиваю роуты -главная или детали (3 штуки)

const App = (props) => {

    useEffect ( () => {
        const requestUrl = 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,XRP';
        const arrUrl = ['https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=24']; 

        props.mainDataPrice(requestUrl); // запрос основных данных - курс 3ех валют
        props.last24hourPriceData(arrUrl); // запрос на получение массива данных о цене 24 назад
    },[]);

    if (props.dataPriceLoad && props.last24hourPriceLoad) { // рендер при получении всех данных
        // тут рассчеты изменений за 24 часа в процентах и долларах (это буду кидать через пропсы, чтобы не повторять логику расчетов) 
        const changePrice =[]; // заношу проценты изменений
        let totalChangeUSD = 0;
        const dataPrice = Object.entries(props.dataPrice)
        dataPrice.forEach((item, index) => {
            changePrice.push( ((1/item[1] - props.last24hourPrice[index]) / props.last24hourPrice[index] * 100).toFixed(2) ); // закидываю проценты по всем коинам
            totalChangeUSD += (1/item[1] - props.last24hourPrice[index]); // изменение в долларах по всем в сумме
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
    
const mapStateToProps = state => ({
    dataPrice: state.mainPriceReducer.dataPrice, // получаю основной курс
    dataPriceLoad: state.mainPriceReducer.isLoaded, // готовность основного курс
    last24hourPrice: state.last24hourPriceReducer.last24hourPrice, // получаю курс сутки назад
    last24hourPriceLoad: state.last24hourPriceReducer.isLoaded // готовность
});
const mapDispatchToProps = dispatch => ({
    mainDataPrice: url => dispatch(mainPriceData(url)), // для вызова функции из action
    last24hourPriceData: arrUrl => dispatch(last24hourPriceData(arrUrl))   
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
