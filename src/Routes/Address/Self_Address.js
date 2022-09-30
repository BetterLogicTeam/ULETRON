import { useEffect, useState } from "react";
import { loadWeb3 } from "../../apis/api";
import { PagePath } from "../../Components";
import { API } from "../../Redux/actions/API";

const Self_Address = () => {
    const [address, setaddress] = useState()
    const user = localStorage.getItem("user");
    let res = JSON?.parse(user)
    let uid = res?.uid;

    const userAddress = async () => {
        let res = await API.get(`wallet_address?id=${uid}`);
        res = res?.data?.data;
        // let acc =await loadWeb3()
        //console.log("ACC", res);
        setaddress(res)
    }

    useEffect(() => {
        userAddress()
    }, [])


    return (
        <div className="row justify-content-center" >
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Self Address", page_path: "Address / Self Address" }} />


                <h5 className="text-white mt-5">Wallet Address : {(<a href={`https://tronscan.io/#/contract/${address}`} className="Txn_here" target="_blank">{address || "Connect Wallet"}</a>)}  </h5>


            </div>
        </div>
    );
}

export default Self_Address;