import React from 'react';
import Coin from './Coin.js';
import { connect } from 'react-redux';

const CoinBtns = (props) => {
    const dataPrice = Object.entries(props.dataPrice),
          names = ['Bitcoin', 'Ethereum', 'Ripple'], //тут имена (по идее с сервера)
          balance = [0.21234243, 2.3222343, 156.3424232], //тут кол-во (по идее с сервера)
          icons = [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png', 
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png', 
            'https://d2a4hncphh3gxw.cloudfront.net/image/artwork/86852/39/92/39920819aaeb27ff97ffcae80432e230_86852'
          ];

    return dataPrice && dataPrice.map ((item, index) => (
        <Coin
        id ={index}
        key ={index}
        data = {item}
        name ={names[index]}
        balance = {balance[index]}
        logo = {icons[index]}
        place = {props.place}
        changePrice = {props.changePrice[index]}
        />
    ));
};

const mapStateToProps = state => ({
    dataPrice: state.mainPriceReducer.dataPrice, // получаю основной курс
    dataPriceLoad: state.mainPriceReducer.isLoaded
});
export default connect(mapStateToProps, null)(CoinBtns);