import React from "react";
import './Profit.css'
import Chart from 'react-apexcharts'
const Profit = (props) => {
    return (
        <>
        <div>
        <div className=" bg-color br-1 text-white px-0 m-0 py-3 row" id="my-profit">
            <div className="col-lg-6">
                <Chart               
                    options={props.opt.options}
                    series={[300]}
                    type="radialBar"
                    height={'300'}    
                />       
            </div>
            <div className="col-lg-6">
                <Chart
                    options={props.opt.options}
                    series={[((props.data.EarnAmount/props.data.earned_outof)*300).toFixed(0)]}
                    // series={[props.data.maxIncome]}

                    type="radialBar"
                    height={'300'}
                />                
                <p className="p-color text-center">Your total earning is {props.data.EarnAmount} USD out of {props.data.earned_outof} USD (Your earned {props.data.maxIncome} out of 300% of your investment )</p>
            </div>

            </div>
        </div>
        </>
     );
}
 
export default Profit;