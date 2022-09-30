import { useEffect, useState } from "react";
import { PagePath, Table, Table_Buttons } from "../../Components";
import { API } from '../../Redux/actions/API'

const Matching_Level_Income = () => {
    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)

    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;

            let responce = await API?.get(`/roiLevelIncome?id=${uId}`);
            responce = responce?.data?.data;

            setreferralApi(responce)

        } catch (e) {
            console.log("Error While calling Referrer API", e);
        }
    }


    useEffect(() => {
        referral_API()
    }, [])

    const indexOfLastPost = currentPage * listPerpage;
    const indexOfFirstPage = indexOfLastPost - listPerpage;
    const currentPost = referralApi.slice(indexOfFirstPage, indexOfLastPost)

    var [matching_level_income, set_matching_level_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'RowNumber' },
            { Header: 'User Id', accessor: 'sid' },
            { Header: 'Form ID', accessor: 'uid' },
            { Header: 'Level', accessor: 'level' },
            { Header: 'On Amount', accessor: 'on_amount' },
            { Header: 'Income(USD)', accessor: 'level_income' },
            { Header: 'Date & Time', accessor: 'edate' }
        ]
    });
    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Referral Daily Yield ", page_path: "All Income / Referral Daily Yield " }} />
                {/* <div className="row my-4 align-items-end justify-content-center gy-4">
                    <div className="col-md-3 col-lg-2 col-8">
                        <p className="p-color p-0 m-0">Select Date</p>
                        <input type="number" prototype="Select Level" className="input bg-color ps-4" />
                    </div>
                    <div className="col-md-3 col-lg-2 col-8">
                        <p className="p-color p-0 m-0">Select Date</p>
                        <input type="date" prototype="Select Level" className="input bg-color ps-4" />
                    </div>
                    <div className="col-md-3 col-lg-2 col-8">
                        <p className="p-color p-0 m-0">Select Date</p>
                        <input type="date" prototype="Select Level" className="input bg-color ps-4" />
                    </div>
                    <button className="bg-primary col-md-2 col-6 col-lg-1 btn text-white">Search</button>
                </div> */}
                <Table
                    data={[...currentPost]}
                    columns={matching_level_income.cols}
                />
                <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />

            </div>
        </div>
    );
}

export default Matching_Level_Income;