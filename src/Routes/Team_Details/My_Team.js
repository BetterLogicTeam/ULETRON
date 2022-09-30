import moment from "moment";
import { useEffect, useState } from "react";
import { PagePath, Table, Table_Buttons } from "../../Components";
import { API } from '../../Redux/actions/API'
import './MyTeam.css'


const My_Team = () => {


    // const [referralApi, setreferralApi] = useState([])
    const [leftreferralApi, setleftreferralApi] = useState([])
    const [RightreferralApi, setRightreferralApi] = useState([])

    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)

    const [currentPage2, setcurrentPage2] = useState(1)
    const [listPerpage2, setlistPerpage2] = useState(10)
    const [getuerid, setgetuerid] = useState("")
    const [filterValue, setFilterValue] = useState("");
    const [FilterRight, setFilterRight] = useState("")



    const referral_API = async () => {
        try {
            const user = localStorage?.getItem("user");

            let ress = JSON?.parse(user);
            let uId = ress?.uid;//778899;
            let status = 2;
            console.log("uId", uId);
            console.log("status", status);
            let responseLeft = await API?.post('/downlineDetails', {
                "id": uId,
                "position": 1,
                "SearchTerm": '',
                "status": status
            })
            responseLeft = responseLeft?.data?.data;
            console.log("responseLeft", responseLeft);

            let responceRight = await API?.post('/downlineDetails', {
                "id": uId,
                "position": 2,
                "SearchTerm": '',
                "status": status
            })
            responceRight = responceRight?.data?.data;
            console.log("responceRight", responceRight);

            console.log("465539", getuerid);
            // let arr = []
            let arrayLeft = []
            let arrayRight = []
            responseLeft?.forEach((item, index) => {
                if (FilterRight == 2 || FilterRight == "") {
                    arrayLeft?.push({
                        sr: index + 1,
                        id: `${item?.uid} `,
                        // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                        date_time: `${item?.edate} `,
                        remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                        activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                        staking: item.packagename
                        // date: item?.dd
                    });

                }
                else if (FilterRight == 1) {
                    item.top_update !== null ?
                        arrayLeft?.push({
                            sr: index + 1,
                            id: `${item?.uid} `,
                            // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                            date_time: `${item?.edate} `,
                            remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                            activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                            staking: item.packagename
                            // date: item?.dd
                        }) : <></>

                }
                else if (FilterRight == 0) {
                    console.log("ConFilterRight", FilterRight);
                    item.top_update == null ?
                        arrayLeft?.push({
                            sr: index + 1,
                            id: `${item?.uid} `,
                            // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                            date_time: `${item?.edate} `,
                            remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                            activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                            staking: item.packagename
                            // date: item?.dd
                        }) : <></>
                }
                setleftreferralApi(arrayLeft)
            })
            console.log("responceLeft", arrayLeft);

            responceRight?.forEach((item, index) => {
                console.log("getuerid", filterValue)
                if (filterValue == 2 || filterValue == "") {
                    // item.top_update !== null ?
                    arrayRight?.push({
                        sr: index + 1,
                        id: `${item?.uid} `,
                        // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                        date_time: `${item?.edate} `,
                        remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                        activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                        staking: item.packagename
                        // date: item?.dd
                    })
                    // :<></>
                }
                else if (filterValue == 1) {
                    item.top_update !== null ?
                        arrayRight?.push({
                            sr: index + 1,
                            id: `${item?.uid} `,
                            // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                            date_time: `${item?.edate} `,
                            remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                            activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                            staking: item.packagename
                            // date: item?.dd
                        })
                        : <></>
                }

                else if (filterValue == 0) {
                    item.top_update == null ?
                        arrayRight?.push({
                            sr: index + 1,
                            id: `${item?.uid} `,
                            // Wallet: item?.user_id?.substring(0, 4) + "..." + item?.user_id?.substring(item?.user_id?.length - 4),
                            date_time: `${item?.edate} `,
                            remark: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
                            activation_date: (<>{item.top_update == null ? (<></>) : (<>{item.top_update}</>)}</>),
                            staking: item.packagename
                            // date: item?.dd
                        })
                        : <></>
                }
                setRightreferralApi(arrayRight)
            })
            console.log("responceRight", arrayRight);
        }
        catch (e) {
            console.log("Error While calling Referrer API", e);
        }
    }

    useEffect(() => {
        referral_API()
    }, [filterValue, FilterRight])
    console.log("FilterRight", FilterRight);

    const indexOfLastPost = currentPage * listPerpage;
    const indexOfFirstPage = indexOfLastPost - listPerpage;
    const currentPostLeft = leftreferralApi.slice(indexOfFirstPage, indexOfLastPost)

    const indexOfLastPost2 = currentPage2 * listPerpage2;
    const indexOfFirstPage2 = indexOfLastPost2 - listPerpage2;
    const currentPostRight = RightreferralApi.slice(indexOfFirstPage2, indexOfLastPost2)


    var [my_team, set_my_team] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'sr' },
            { Header: 'ID', accessor: 'id' },
            // { Header: 'Wallet', accessor: 'Wallet' },
            { Header: 'Reg. Date & Time', accessor: 'date_time' },
            { Header: 'Remark', accessor: 'remark' },
            { Header: 'Activation Date & Time ', accessor: 'activation_date' },
            { Header: 'Package', accessor: 'staking' },
        ],
        rows: [
            {
                sr: '1', id: '625029', /*Wallet: 'TNS5EsYNsnnnDQsGGkzaFmZWHfGtseLYTJzaFmZWHfGt',*/
                date_time: '6/20/2022 9:36:01 AM', remark: 'Active', activation_date: '12/11/2021 1:40:08 PM', staking: '200.00'
            },
            {
                sr: '2', id: '625029', /*Wallet: 'TNS5EsYNsnnnDQsGGkzaFmZWHfGtseLYTJzaFmZWHfGt',*/
                date_time: '6/20/2022 9:36:01 AM', remark: 'Active', activation_date: '12/11/2021 1:40:08 PM', staking: '200.00'
            },
            {
                sr: '3', id: '625029', /*Wallet: 'TNS5EsYNsnnnDQsGGkzaFmZWHfGtseLYTJzaFmZWHfGt',*/
                date_time: '6/20/2022 9:36:01 AM', remark: 'Active', activation_date: '12/11/2021 1:40:08 PM', staking: '200.00'
            },
            {
                sr: '4', id: '625029', /*Wallet: 'TNS5EsYNsnnnDQsGGkzaFmZWHfGtseLYTJzaFmZWHfGt',*/
                date_time: '6/20/2022 9:36:01 AM', remark: 'Active', activation_date: '12/11/2021 1:40:08 PM', staking: '200.00'
            },
        ]
    });
    return (
        // <div className="container">
        <div className="row justify-content-center team-dis col-md-11">
            <PagePath data={{ page_name: "My Team", page_path: "Team Details / My Team" }} />
            <div className="col-md-6 py-3 mt-5">
            <div className="col-md-12">
                <h1 className="mb-0 fs-3 pe-4 border_right p-color">Left</h1>

                </div>
                <br/>

                <div className="row">

                <div className="col-md-3">
                        <p className="p-color mt-1" >Choose Status :</p>

                        </div>
                    <div className="col-md-5">
                        <select className=" input bg-color ps-4" id="input-select"
                            defaultValue={FilterRight}
                            value={FilterRight}
                            onChange={(e) => setFilterRight(e.target.value)}>
                            <option value="">Select Status</option>

                            <option value="2">All</option>
                            <option value="1">Active</option>
                            <option value="0">In-Active</option>

                        </select>
                    </div>
                </div>

                <Table
                    data={currentPostLeft}
                    columns={my_team.cols}
                />

                <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={leftreferralApi.length} listPerpage={listPerpage} />

            </div>
            <div className="col-md-6 py-3 mt-5">

            <div className="col-md-12">
                <h1 className="mb-0 fs-3 pe-4 border_right p-color">Right</h1>

                </div>
                <br/>

                <div className="row">

                <div className="col-md-3">
                        <p className="p-color mt-1" >Choose Status :</p>

                        </div>
                    <div className="col-md-5">
                        <select className=" input bg-color ps-4" id="input-select"
                            defaultValue={filterValue}
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="">Select Status</option>

                            <option value="2">All</option>
                            <option value="1">Active</option>
                            <option value="0">In-Active</option>

                        </select>

                    </div>
                </div>



                <Table
                    data={currentPostRight}
                    columns={my_team.cols}
                />

                <Table_Buttons indexOfFirstPage={indexOfFirstPage2} indexOfLastPost={indexOfLastPost2} setcurrentPage={setcurrentPage2} currentPage={currentPage2} totalData={RightreferralApi.length} listPerpage={listPerpage2} />

            </div>
        </div>

        // </div>
    );
}

export default My_Team;