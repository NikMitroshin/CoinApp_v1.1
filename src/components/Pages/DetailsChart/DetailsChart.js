import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { priceForChartData } from '../../../redux/actions/actions.js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './DetailsChart.css';

const DetailsChart =(props) => {

    useEffect ( () => { 
        const requestUrl = `https://min-api.cryptocompare.com/data/v2/histo${props.infoChart.time}?fsym=${props.coinName[0]}&tsym=USD&limit=${props.infoChart.limit}`;
        props.priceForChartData(requestUrl);
    },[props.infoChart]);

    if (props.priceForChartLoad) {
        const addZeroToData = (num) => {
            if (num <= 9) num = '0' + num;
            return num; 
        };
        const timeConverter = (UNIX_timestamp) => {
            const newTime = new Date(UNIX_timestamp * 1000);
            let time;
            if (props.infoChart.time == 'day'){
                const month = addZeroToData(newTime.getMonth());
                const date = addZeroToData(newTime.getDate());
                time = date + '.' + month;
            } else {
                const hour = addZeroToData(newTime.getHours()); 
                const min = addZeroToData(newTime.getMinutes());
                time = hour + 'h' + min;
            };
            return time;
        };
        // дальше определяю максимальное значение цены за промежуток, выбираю подходящие интервалы
        let maxPrice=0;
        const newdata = [...props.priceForChart];
        newdata.map( (item,index) =>{
            newdata[index].time = timeConverter(item.time); 
            newdata[index].close = item.close; 
            if (item.close> maxPrice) {
                maxPrice = item.close;
            };
        });
        const points = [0];
        const makePoints = (num) => { 
            let stepInterval=0,
                step =0;
            if (num > 0.5) {
                const num1 = Math.trunc(num),
                      firstOfNum = +(''+num1)[0];
                if (firstOfNum > 3) {
                    step = 1; 
                } else  if (firstOfNum > 1) {
                    step = 0.5; 
                } else {
                    step = 0.25;
                };
                for (let i = 1; i < num1.toString().length; i++){ // умножаю step на 10 столько раз сколько цифр получаю 10/100/1000
                    step = step * 10;
                };
                for (let i = 1; stepInterval <= num; i++){
                    stepInterval = step * i;
                    points.push(stepInterval);
                };
            } else {
                for (let i = 0; i < 6 ; i++){
                    points.push(i/10);
                };
            };
        };
        makePoints(maxPrice);

        return (
            <div className="information">
                <ResponsiveContainer width="100%" height={470}>
                    <AreaChart data={newdata}>
                        <CartesianGrid 
                            vertical={false} 
                            strokeWidth={0.1}
                        />
                        <XAxis 
                        dataKey="time" 
                        tick={{fontSize: 10}} 
                        interval={props.infoChart.interval} 
                        stroke="#fff"
                        />
                        <YAxis 
                        type="number" 
                        stroke="#fff" 
                        width={1} 
                        tick={{fontSize: 10}}  
                        ticks={points} unit='$'
                        /> 
                        <defs>
                            <linearGradient id="linear-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="rgba(149, 108, 236, 0.2)"/>
                                <stop offset="100%" stopColor="rgba(149, 108, 236, 0.01)"/>
                            </linearGradient>
                        </defs>
                        <Area 
                        dataKey="close" 
                        stroke="#956cec" 
                        fill="url(#linear-gradient)" 
                        strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }  else {return ( <h2>PLEASE, WAIT</h2> )}; 
};

const mapStateToProps = state => ({
    priceForChart: state.priceForChartReducer.priceForChart, // получаю основной курс
    priceForChartLoad: state.priceForChartReducer.isLoaded // получаю основной курс
});
const mapDispatchToProps = dispatch => ({
    priceForChartData: url => dispatch(priceForChartData(url))
});  
export default connect(mapStateToProps, mapDispatchToProps)(DetailsChart);

