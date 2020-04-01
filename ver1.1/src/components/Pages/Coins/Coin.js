import React from 'react';
import {NavLink} from 'react-router-dom';
import './Coin.css';

// тут формирую кнопки на главном экране и наверху на втором (в зависимости от условия)
const Coin = (props) => {
    const oneCoinPrice = 1 / (props.data[1]),
          coinBalanceUsd = oneCoinPrice * props.balance;
    const showChange = (change) => {
        if (change > 0) {
            return (
                <span className="balance__changes_up">+ {props.changePrice} %</span>
            );
        } else if (change == 0){
            return (
                <span className="balance__changes"> {-props.changePrice} %</span>
            );
        } else {
            return (
                <span className="balance__changes_down">- {-props.changePrice} %</span>
            );
        };
    };

    if (props.place == 'main'){ //вывожу боксы с коинами в зависимости от места вызова
        return (
            <div className='block-coin'>
                <NavLink to={'/coin' + (props.id + 1)}>
                    <div className="coin-balance">
                        <div className="coin-icon"><img src={props.logo} alt="" height='20px'/></div>
                        <div className="coin-name">
                            <p className="coin-name__abbr">{props.data[0]}</p>
                            <p className="coin-name__full">{props.name}</p>
                        </div>
                        <div className="coin-total">
                            <div className="coin-total__quantity">{props.balance}</div>
                            <div className="coin-total__in-usd">${coinBalanceUsd.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                    </div>
                    <div className="hr"></div>
                    <div className="coin-info">
                        <div className="info-value">
                            <p className="info-value__usd">${oneCoinPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className="info-value__text">Price</p>
                        </div>
                        <div className="info-changes">
                            <div className="info-changes__percent"> {showChange(props.changePrice)}</div>
                            <div className="info-changes__text">Profit / Loss</div>
                        </div>
                    </div> 
                </NavLink>        
            </div>   
        );
    } else if (props.place == 'details'){
        return (
            <div className='block-coin block-coin-details'>
                <NavLink to={'/coin' + (props.id + 1)}>
                    <div className="coin-balance coin-balance-details">
                        <div className="coin-icon"><img src={props.logo} alt="" height='20px'/></div>
                        <div className="coin-name">
                            <p className="coin-name__abbr coin-name__abbr-details">{props.data[0]}</p>
                            <p className="coin-name__full coin-name__full-details">{props.name}</p>
                        </div>
                        <div className="coin-total">
                            <div className="coin-total__quantity coin-total__quantity-details">{props.balance}</div>
                            <div className="info-changes__percent info-changes__percent-details">{showChange(props.changePrice)}</div>
                        </div>
                    </div>
                </NavLink>        
            </div>
        );
    } else {
        return (
            <div>
                <h2>Где-то ошибка :(</h2>
            </div>
        );
    };
};

export default Coin;