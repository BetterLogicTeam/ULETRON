import React from "react";
import './All_Income.css'
const All_Income = (props) => {
    return (
        <div>
        <div className="  All_Income bg-color row p-0 m-0 br-1" id="my-income">
            <div className=" p-3 row">
                <p className="h-color h4">All Incomes</p>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Registration Direct Income</p>
                    <p className="h-color h4">{props.data.registration_directIncome}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Registration Level Income</p>
                    <p className="h-color h4">{props.data.registration_levelIncome}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>

                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">ROI Income</p>
                    <p className="h-color h4">{props.data.rio_income}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>

                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Referral Daily Yield Income</p>
                    <p className="h-color h4">{props.data.levelincome}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>



                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Matching Income</p>
                    <p className="h-color h4">{props.data.binaryIncome}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Dividend Income</p>
                    <p className="h-color h4">{props.data.dividend_income}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <p className="h-color h4">Rank Achiever Yield Income</p>
                    <p className="h-color h4">{props.data.rank_yield_income}$</p>
                </div>
                <div className="progress-row bg-color br-1">
                    <div className="progress-bar-row bg-white  br-1" style={{ width: '102%' }}></div>
                </div>
                
            </div>
            </div>
        </div>
    );
}

export default All_Income;