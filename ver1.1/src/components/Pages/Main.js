import React from 'react';
import CoinBtns from './Coins/CoinBtns.js';
import { connect } from 'react-redux';
import './Main.css';

const Main = (props) => {
    const showTotalChange = () => {
        if (props.totalChangeUSD > 0) {
            return (
                <span className="balance__changes_up">+ ${props.totalChangeUSD.toFixed(2)} <i className="fas fa-long-arrow-alt-up"></i></span>
            );
        } else {
            return (
                <span className="balance__changes_down">- ${-props.totalChangeUSD.toFixed(2)} <i className="fas fa-long-arrow-alt-down"></i></span>
            );
        };
    };
    
    if (props.dataPriceLoad){
        const BTCBalance = 0.2432432,
              ETHBalance = 2.3242432,
              XRPBalance = 142.2432432,
              BTCCost = 1 / props.dataPrice.BTC,
              ETHCost = 1 / props.dataPrice.ETH,
              XRPCost = 1 / props.dataPrice.XRP,
              BTCBalanceUSD = BTCBalance * BTCCost,
              ETHBalanceUSD = ETHBalance * ETHCost,
              XRPBalanceUSD = XRPBalance * XRPCost,
              totalBalance = (BTCBalanceUSD + ETHBalanceUSD + XRPBalanceUSD).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return (
            <div className='block-page-main'>
                <div className='block-page-header'>
                    <header className="block-main-header">
                        <div className="search"><a href="#" className="header-icon"><i className="fas fa-search" ></i></a></div>
                        <div className="notice"><a href="#" className="header-icon"><i className="far fa-bell"></i></a></div>
                    </header>
                    <div className="block-balance">
                        <h2 className="balance__title">Your total balance</h2>
                        <div className="balance__total"><sup className="balance__icon">$</sup>{totalBalance} </div>
                        <div className="balance__change-text">24h Changes</div>
                        <div className="balance__changes">{showTotalChange()}</div> 
                    </div>
                </div>
                <CoinBtns
                    changePrice={props.changePrice}
                    place = {'main'}
                />
            </div>
        );
    } else { return ( <h2 className="warning">Please, wait</h2>) };
};

const mapStateToProps = state => ({
    dataPrice: state.mainPriceReducer.dataPrice, 
    dataPriceLoad: state.mainPriceReducer.isLoaded
});
export default connect(mapStateToProps, null)(Main);