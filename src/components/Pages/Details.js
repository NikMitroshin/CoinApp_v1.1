import React, { useState} from 'react';
import CoinBtns from './Coins/CoinBtns.js';
import {NavLink} from 'react-router-dom';
import DetailsChart from './DetailsChart/DetailsChart.js';
import './Details.css';

const Details = (props) => {
    const names = ['Bitcoin', 'Ethereum', 'Ripple'], //тут имена (по идее с сервера)
          balance = [0.21234243, 2.3222343, 156.3424232], //тут кол-во (по идее с сервера)
          icons = [ 
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png', 
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png', 
              'https://d2a4hncphh3gxw.cloudfront.net/image/artwork/86852/39/92/39920819aaeb27ff97ffcae80432e230_86852'
          ];
    const infoToChartHour = {
        type: 'day',
        time: 'hour',
        limit: 8,
        interval: 0
    };
    const infoToChartDay = {
        type: 'week',
        time: 'day',
        limit: 8,
        interval: 0
    };
    const infoToChartMonth = {
        type: 'month',
        time: 'day',
        limit: 32,
        interval: 3
    };
    const [infoToChart, updateinfoToChart] = useState(infoToChartHour);

    const showChange = (change) => {
        if (change > 0) {
            return (
                <span className="balance__changes_up">+ {props.changePrice[props.coinId]} %</span>
            );
        } else {
            return (
                <span className="balance__changes_down">- {-props.changePrice[props.coinId]} %</span>
            );
        };
    };

    return (
        <div className='block-page-details'>
            <div className='block-page-header'>
                <header className="block-details-header">
                    <NavLink to='/' className="details-back"><i className="fas fa-arrow-left"></i></NavLink>
                </header>
                <div className="box-slide">
                    <CoinBtns
                    changePrice ={props.changePrice}
                    place = {'details'}
                    />
                </div>
                <div className="details-coin">
                    <div className="coin-icon"><img src={icons[props.coinId]} alt="" height='30px'/></div>
                    <div className="coin-name">
                        <p className="details-coin-name__abbr">{props.coinName[0]}</p>
                        <p className="details-coin-name__full">{names[props.coinId]}</p>
                    </div>
                    <div className="coin-total">
                        <div className="details-coin-total__quantity">{balance[props.coinId]}</div>
                        <div className="details-info-changes__percent">{showChange(props.changePrice[props.coinId])}</div>
                    </div>
                </div>
                <div className="box-time-btns">
                    <button className={ (infoToChart.type == infoToChartHour.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartHour)}>Day</button>
                    <button className={ (infoToChart.type == infoToChartDay.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartDay)}>Week</button>
                    <button className={ (infoToChart.type == infoToChartMonth.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartMonth)}>Month</button>
                </div>
            </div>
            <DetailsChart
                coinName = {props.coinName}
                infoChart = {infoToChart}
            />
        </div>
    );
};

export default Details;
