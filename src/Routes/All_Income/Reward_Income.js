import { useState, useEffect } from "react";
import { PagePath, Table, Table_Buttons } from "../../Components";
import { API } from '../../Redux/actions/API.js';

const user = localStorage?.getItem("user");
let ress = JSON.parse(user);
let uId = ress?.uid;

const Reward_Income = () => {
    const [rewardAPI, setRewardAPI] = useState([]);
    const rewardIncome_API = async () => {
        try {
            let response = await API.get(`rewardIncome?id=${uId}`);
            response = response?.data?.data;
            setRewardAPI(response);
        } catch (error) {
            console.log("Error While calling reward income API", error)
        }

    }

    useEffect(() => {
        rewardIncome_API()
    }, [])

    console.log("xxxx=>", rewardAPI)

    var [reward_income, set_reward_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'row' },
            { Header: 'User Id', accessor: 'uid' },
            { Header: 'Reward Name', accessor: 'Gift' },
            { Header: 'Rank Name', accessor: 'rank_name' },
            { Header: 'Achieved Date & Time', accessor: 'ad' },
        ]
    });

    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Referral Daily Yield Booster", page_path: "All Income / Referral Daily Yield Booster" }} />
                <Table
                    data={[...rewardAPI]}
                    columns={reward_income.cols}
                />
            </div>
        </div>
    );
}

export default Reward_Income;