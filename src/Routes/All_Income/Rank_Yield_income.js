import { useEffect, useState } from "react";
import { PagePath, Table, Table_Buttons } from "../../Components";
import { API } from '../../Redux/actions/API'


const Matching_Income = () => {
    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)

    const referral_API = async () => {
        try {
            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;

            let responce = await API?.get(`rankYieldIncome?id=${uId}`);
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


    var [matching_income, set_matching_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'RowNumber' },
            { Header: 'User Id', accessor: 'uid' },
            { Header: 'Form Id', accessor: 'fromuid' },
            { Header: 'Net Income', accessor: 'income' },
            { Header: 'On Amount', accessor: 'onamount' },
            { Header: 'Date & Time', accessor: 'dd' }
        ]
    });

    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Rank Achievers Yield", page_path: "All Income / Rank Achievers Yield" }} />
                <Table
                    data={[...currentPost]}
                    columns={matching_income.cols}
                />
                <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />

            </div>
        </div>
    );
}

export default Matching_Income;