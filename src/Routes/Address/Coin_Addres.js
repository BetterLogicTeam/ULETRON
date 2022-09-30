import { PagePath } from "../../Components";

const Coin_Address = () => {
    return (
        <div className="row justify-content-center" >
            <div className="col-md-11 py-3">
                <PagePath data={{ page_name: "Coin Address", page_path: "Address / Coin Address" }} />
                <h5 className="text-white mt-5">Coin Address : {(<a href={`https://tronscan.io/#/contract/TB6ZeEX4xNbjqav8ceEh4ehXtL47jJs5CQ`} className="Txn_here" target="_blank">{"TB6ZeEX4xNbjqav8ceEh4ehXtL47jJs5CQ" || "Connect Wallet"}</a>)}  </h5>

            </div>
        </div>
    );
}

export default Coin_Address;