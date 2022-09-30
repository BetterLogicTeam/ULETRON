import { API } from '../../Redux/actions/API'
import { useEffect, useState } from 'react'
import { PagePath, Table, Table_Buttons } from "../../Components";

const RegistrationHistory = () => {
    const user = localStorage.getItem("user");
    let ress = JSON?.parse(user);
    let uid = ress?.uid;
    const [registrationHistory_API, setRegistrationHistory_API] = useState([]);

    const registrationHistoryAPI = async () => {
        try {
            let response = await API.get(`registrationHistory?id=${uid}`)
            response = response?.data?.data;
            setRegistrationHistory_API(response);
        } catch (error) {
            console.log("Error While calling reward income API", error)
        }

    }

    useEffect(() => {
        registrationHistoryAPI();
    }, [])

    console.warn("wwww=> ", registrationHistory_API)

    var [reward_income, set_reward_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'row' },
            { Header: 'User Id', accessor: 'uid' },
            { Header: 'Reg. Date & Time', accessor: 'reg_date' },
            { Header: 'Confirm Date & Time', accessor: 'confirm_date' },
            { Header: 'Txn', accessor: 'traxn' },
            { Header: 'Amount', accessor: 'planamount' },
        ]
    });

    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Registration History", page_path: "Activation / Registration History" }} />
                <Table
                    data={[...registrationHistory_API]}
                    columns={reward_income.cols}
                />
            </div>
        </div>
    );
}

export default RegistrationHistory