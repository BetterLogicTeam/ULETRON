import { useEffect, useState } from "react";
import { PagePath, Table, Table_Buttons } from "../../Components";
import { API } from '../../Redux/actions/API'


const Roi_Income = () => {

    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)

    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;

            let responce = await API?.get(`/roiIncome?id=${uId}`)
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


    var [roi_income, set_roi_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'RowNumber' },
            { Header: 'User Id', accessor: 'uid' },
            { Header: 'Income', accessor: 'plan_amount' },
            { Header: 'Date & Time', accessor: 'edate' }
        ]
    });
    return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Daily Yield", page_path: "All Income / Daily Yield" }} />
                <Table
                    data={[...currentPost]}
                    columns={roi_income.cols}
                />
                <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />

            </div>
        </div>
    );
}

export default Roi_Income;