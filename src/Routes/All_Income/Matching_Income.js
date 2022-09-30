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
            let uId = ress?.uid;
            let ress = JSON?.parse(user);

            let responce = await API?.get(`binaryIncome?id=${uId}`);
            responce = responce?.data?.data;
            setreferralApi(responce)
        } catch (e) {
            console.log("Error While calling Referrer API", e);
        }
    }

    useEffect(() => {
        referral_API()
    }, [])

    console.warn("wwww=>", referralApi)

    const indexOfLastPost = currentPage * listPerpage;
    const indexOfFirstPage = indexOfLastPost - listPerpage;
    const currentPost = referralApi.slice(indexOfFirstPage, indexOfLastPost)


    var [matching_income, set_matching_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'RowNumber' },
            { Header: 'User Id', accessor: 'uid' },
            { Header: 'Matching Business', accessor: 'paidpv' },
            // { Header: 'Capping Amount', accessor: 'cappingamount' },
            { Header: 'Net Income', accessor: 'netincome' },
            { Header: 'Date & Time', accessor: 'binarydate' }
        ]
    });

    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Matching Reward", page_path: "All Income / Matching Reward" }} />
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