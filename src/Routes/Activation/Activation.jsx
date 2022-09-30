import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState  } from "react";
import logo from '../../assets/activateYello.png';
import logo1 from '../../assets/images/logo (2).png';
import { getDownlineReport } from "../../Redux/actions/dailyYield";
import { API } from "../../Redux/actions/API";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Activation.css';
import { toast } from "react-toastify";
import Web3 from "web3";
import moment from "moment";
import TronWeb from "tronweb";

import {
  contractAddressToken,
  abiToken,
  contractAddress,
  abi,
  troncontract_abi,
  troncontract,
  ULE_token,
  ule_token_abi,
} from "../../Containers/Activate/constants";
import { loadWeb3 } from "../../apis/api";
import axios from "axios";

export const Activate = () => {
  const downlineReport = useSelector(
    (state) => state?.dailyYield?.downlineReport
  );
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const dashboard = useSelector((state) => state?.dashboard);

  const [blnce, setBlnce] = useState(0);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoadingTrans, setLoadingTrans] = useState(false);
const  [isloading ,setIsLoading]= useState(false)
  const [apiDate, setDate] = useState(true);
  const [pending, setPending] = useState(0);
  const [betaWallet, setBetaWallet] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [confirm, setConfirm] = useState([]);
  const [rate, setRate] = useState(0);
  const [ratematic, setRateMatic] = useState(0)
  const [TronAddress, setTronAddress] = useState("")
  const [balanceUle, setbalanceUle] = useState(0);
  const [TrxBalance, setTrxBalance] = useState(0)



  const getLiveRate = async () => {
    try {
      const res = await API.get(`/live_rate?id=${1}`);
      setRate((res?.data.data[0].usdperunit));
    } catch (e) {
      console.log("error", e);
    }
  };
  const LiveRateMaticAPI = async () => {
    try {
      let res = await API.get(`/live_rate_matic?id=${1}`);
      res = res.data.data[0];
      console.log("res", res);
      setRateMatic((res.usdperunit));

    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  useEffect(() => {
    LiveRateMaticAPI();
  }, []);
  const getBetaWallet = async () => {
    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    try {
      const res = await API.get(`/get_betawallet?id=${uId}`);
      setBetaWallet((res?.data.data[0]));
      console.log("res?.data.data[0]",res?.data.data[0].activatupgradeamnt_trading);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };
  const getLiveRate1 = async () => {
    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    try {
      const res = await API.get(`/pending_date?id=${uId}`);
      setDate(res?.data.data[0].edate);
      let date1 = moment(res?.data.data[0].edate)
        .add(15, "minutes")
        .isBefore(moment());
      setDate(date1);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getLiveRate2 = async () => {
    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    try {
      const res = await API.get(`/pending_activation?id=${uId}`);
      setPending(res?.data.data[0]);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getLiveRate3 = async () => {
    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    try {
      const res = await API.get(`/confirm_payment?id=${uId}`);
      setConfirm(res?.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    getBetaWallet();
    getLiveRate();
    getLiveRate1();
    getLiveRate2();
    getLiveRate3();
  }, []);



  let mainAccount = "";
  async function Ethereum() {

    try {
      console.log("initial");
      mainAccount = await window?.tronWeb?.defaultAddress?.base58;
      console.log("main Account", mainAccount);
      setTronAddress(mainAccount)
      // setAccountAddress(mainAccount);
      if (mainAccount) {
        localStorage.setItem("mainAccount", mainAccount);
        console.log("mainAccount", mainAccount);
        setTimeout(() => {
          getBalanceOfAccount();
        }, 100);
      } else {
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
        const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
        const eventServer = "https://api.shasta.trongrid.io/";
        const gettronWeb = new TronWeb(fullNode, solidityNode, eventServer);
        setTimeout(() => {
          // getData();
        }, 100);

        toast.warning("Please login or install tron wallet!");
      }
    } catch (error) {
      toast.error(error.message);

      console.log("error", error.message);
    }
  }
  const getBalanceOfAccount = async () => {
    try {
      await window.tronWeb.trx.getBalance(mainAccount, function (err, res) {
        var blnc = parseInt(res) / 1000000;
        setTrxBalance(blnc.toFixed(3));
      });
    }
    catch (e) {
      console.log("blnc", e);
    }
  }


  useEffect(() => {
    setTimeout(() => {
      Ethereum();
    }, 2000);
  }, []);






  


  const CONTRACT_ADDRESS = "TLcKN2SBTAhiuUmkCvb86hRGdnV42cGyrt";
  const Widthdraw_Address = "TB6ZeEX4xNbjqav8ceEh4ehXtL47jJs5CQ"
  const UleBalance = async () => {

    let contract = await window.tronWeb.contract().at(CONTRACT_ADDRESS);
    mainAccount = await window?.tronWeb?.defaultAddress?.base58;
    let result = await contract.balanceOf(mainAccount).call()

    result = parseInt(result)
    result = result / 1000000000000000000;
    result = result.toFixed(1)
    console.log("Addressss", result);
    setBlnce(result);

    setbalanceUle(result)
    console.log("Balance Ule", result);



  }
    

  async function handleActivation() {
    try {
      setLoadingTrans(true);

     

      // let address = dashboard?.walletAddress; //Login User Address
      let address = TronAddress;
      // console.log("ADDRESSSS",address);
      let ress = JSON?.parse(user);
      let uid = ress?.uid;   //Login User Id
      let usdamt = amount; //Package USD Amount
      let token = blnce; //Package ULE Value
      let packid = usdamt;
      // let package = 1;
    
     // alert(uid);
      let mainadd = TronAddress;
     
      if (parseInt(blnce) < parseInt(parseInt(amount) / rate)) {
        alert("Wallet balance insufficient!!!");
        setLoadingTrans(false);

        return;
      }

      // if (parseInt(usdamt) < 100) {
      //   alert("Enter Minimum package amount 100 USD!!!");
      //   setLoadingTrans(false);
      //   return;
      // }

      // if (parseInt(parseInt(usdamt) % 100) != 0) {
      //   alert("Enter package amount in multiple of 100 USD!!!");
      //   setLoadingTrans(false);
      //   return;
      // }

      if (parseInt(usdamt) > 10000) {
        alert("Maximum package amount is 10000 USD");
        setLoadingTrans(false);
        return false;
      }

      if (mainadd == undefined) {
        alert("Please connect wallet!!!");
        setLoadingTrans(false);
        return;
      }
      if (address.toUpperCase() != mainadd.toUpperCase()) {
        alert("Wallet address and login miss match");
        setLoadingTrans(false);
        return;
      }
      if (packid == "0" || packid == "") {
        alert("Please Enter correct package amount!!!");
        setLoadingTrans(false);
        return;
      }
      let tron_Rate = amount*rate;
      let ULE_rate=amount*ratematic

      // const web3 = window.web3;
      ULE_rate = ULE_rate * 1000000000000000000;
      tron_Rate = tron_Rate * 1000000;

      // tron_Rate=tron_Rate/10000000000000000000;
      ULE_rate = parseInt(ULE_rate).toString()

      tron_Rate = parseInt(tron_Rate).toString()
      console.log("tron_Rate", tron_Rate);

      // let tokenAmount = web3.utils.toWei(tron_Rate.toString());
      let tokenAmount = tron_Rate
      // let contract = new web3.eth.Contract(abi, contractAddress);
      let contractToken = await window.tronWeb.contract().at(CONTRACT_ADDRESS);
      await contractToken.approve(Widthdraw_Address, ULE_rate).send({}).then((output) => {
        console.log("- approve Output:", output, "\n");
        toast.success("approve Successful");
        // setLoadingTrans(false)

      })
        .catch((e) => {
          toast.error(e.message);
          setLoadingTrans(false);
        });
      let contract = await window.tronWeb.contract().at(Widthdraw_Address);
      await contract
      .UlebuyRouter(ULE_rate)
      .send({
        callValue: tron_Rate,
        feeLimit: 100000000,
      }).then(async (hash) => {
        if (hash != "") {
          try {
     
       console.log("activation data", uid,mainadd,usdamt,amount,hash);
                let responce = await API.post(`/activation`,{
                  "uid":uid,
                  "useraddress":mainadd,
                  "amount":usdamt,
                  "tokenamount":amount,
                  "transaction":hash
              })
              responce = responce?.data?.data;

           toast.success('Please Wait while transaction is processing...')
          } catch (e) {
            console.log("error", e);
            setLoadingTrans(false);
            toast.error("Something went wrong ! ");
          }
        }
        console.log("Final Output:", hash , "\n");
        toast.success("Transaction is complete");
        setLoadingTrans(false);



      }).catch((e) => {
        toast.error(e.message);
        setLoadingTrans(false);


      })

    } catch (error) {
      console.log("error", error);
      setLoadingTrans(false);

    }
  }
  const getLastTransaction = async () => {
    try {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      const res = await API.get(`/verify_last_update_time?id=${uId}`);
      return res?.data?.data ? res?.data?.data : [];
    } catch (e) {
      return [];
    }
  };
  async function handleUpdation() {
    try {
      setLoadingTrans(true);
      setIsLoading(true);
      // setLoadingTrans(false);
      let maxWithdraw = await getLastTransaction();
      // let address = dashboard?.walletAddress; //Login User Address
      // let address = await loadWeb3()
      // console.log("ADDDDDD", address);
      let uid = dashboard?.userId; //Login User Id
      let usdamt = amount; //Package USD Amount
      let token = blnce; //Package ULE Value
      let packid = usdamt;
      // console.log("VAlue",amount);

      // let package = 1;
      // if (maxWithdraw.length > 0) {
      //   alert(
      //     "You can make upgrade after 2 hours from your previous Upgrade !"
      //   );
      //   setLoadingTrans(false);

      //   return;
      // }
      // let mainadd = account;
      // if (parseInt(amount) < parseInt(betaWallet?.activatupgradeamnt_trading)) {
      //   alert(
      //     "Your Current Package amount should me more than or equal to Last Package"
      //   );
      //   setLoadingTrans(false);

      //   return;
      // }
      // if (parseInt(blnce) < parseInt(parseInt(amount) / rate)) {
      //   alert("Wallet balance insufficient!!!");
      //   setLoadingTrans(false);

      //   return;
      // }

      // if (parseInt(usdamt) < 100) {
      //   alert("Enter Minimum package amount 100 USD!!!");
      //   setLoadingTrans(false);

      //   return;
      // }

      // if (parseInt(parseInt(usdamt) % 100) != 0) {
      //   alert("Enter package amount in multiple of 100 USD!!!");
      //   setLoadingTrans(false);

      //   return;
      // }

      // if (parseInt(usdamt) > 10000) {
      //   alert("Maximum package amount is 10000 USD");
      //   setLoadingTrans(false);

      //   return false;
      // }

      // if (mainadd == undefined) {
      //   alert("Please connect wallet!!!");
      //   return;
      // }
      // if (address.toUpperCase() != mainadd.toUpperCase()) {
      //   setLoadingTrans(false);
      //   alert("Wallet address and login miss match");
      //   setLoadingTrans(false);

      //   return;
      // }
      // if (packid == "0" || packid == "") {
      //   alert("Please Enter correct package amount!!!");
      //   setLoadingTrans(false);
      //   return;
      // }

      let tron_Rate = amount*rate;
      let ULE_rate=amount*ratematic

      // const web3 = window.web3;
      ULE_rate = ULE_rate * 1000000000000000000;
      tron_Rate = tron_Rate * 1000000;

      // tron_Rate=tron_Rate/10000000000000000000;
      ULE_rate = parseInt(ULE_rate).toString()

      tron_Rate = parseInt(tron_Rate).toString()
      console.log("tron_Rate", tron_Rate);

      // let tokenAmount = web3.utils.toWei(tron_Rate.toString());
      let tokenAmount = tron_Rate
      // let contract = new web3.eth.Contract(abi, contractAddress);
      let contractToken = await window.tronWeb.contract().at(CONTRACT_ADDRESS);
      await contractToken.approve(Widthdraw_Address, ULE_rate).send({}).then((output) => {
        console.log("- Output:", output, "\n");
        toast.success("approve Successful");
        // setLoadingTrans(false)

      })
        .catch((e) => {
          toast.error(e.message);
          setLoadingTrans(false);
        });
      let contract = await window.tronWeb.contract().at(Widthdraw_Address);
      await contract.UlebuyRouter(ULE_rate).send({
        feeLimit: 100000000,
        callValue:tron_Rate,
        shouldPollResponse: true
      }).then(async (hash) => {
        // if (hash != "") {
        //   try {
        //    toast.success('')
        //   } catch (e) {
        //     console.log("error", e);
        //     setLoadingTrans(false);
        //     toast.error("Something went wrong ! ");
        //   }
        // }
        console.log("- Output:", hash, "\n");
        toast.success("Transaction is complete");
        setLoadingTrans(false);



      }).catch((e) => {
        toast.error(e.message);
        setLoadingTrans(false);


      })
    } catch (error) {
      console.log("error", error);
      setLoadingTrans(false);
    }
  }


  useEffect(() => {
    UleBalance()
  }, [])

  

  return (
    <>
{/* <button onClick={()=>handleUpdation()} disabled={isloading}
                           >
                             {isloading && (
                              <div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div> )}Submit</button> */}

    {isLoading ? (
        <div className="">
          <div className="content-wrapper">
            <div
              className="w-100  d-flex justify-center"
              style={{ justifyContent: "center" }}
            >
              <div className="section-heading d-flex justify-center">
                <div className="loaders"></div>
              </div>
            </div>
          </div>
        </div>
      ) : betaWallet?.activatupgradeamnt_trading > 0 ? (
        
        <div className="col-md-5">
          <div className="bg_color_activate">
        
        <div className="ule_logo" style={{ margin: "8px 41%" }}>
          {/* <img style={{height: "30px"}} src={logo1} /> */}
        </div>
        
        <div className="top_activate">
        <div className="row">
         
          <div className="col-md-12 text-center">
            <h4 className="text-center head">UPGRADE</h4>
          </div>
        </div>
        <div
          className="modal-header"
          style={{
            paddingBottom: "5px !important",
           borderRadius: '15px'
          }}
        >
          <br></br>
          <div className="avlbal row" style={{ padding: "20px" }}>
            <div className="Activate_upgrate">
            <h6
              className="modal-title pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available ULE Token Balance :
              
            </h6>
            <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                
                placeholder={`${balanceUle} Token`}
                readonly=""
              />
              </div>

              <div className="Activate_upgrate">
              
            <h6
              className="modal-title pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available ULE Tron Balance :
             
          
            </h6>
            <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                
                placeholder={`${TrxBalance} Token`}
                readonly=""
              />
            </div>
            
            <div className="Activate_upgrate">

            <h6 className="modal-title pb-2" style={{ color: "white" }}>
              <span className="">Live Rate : </span>
              
            </h6>
            <input
                type="text"
                className="input_width"
               
                id="txtchangevalue"
                placeholder={`${ratematic} Tron` + "/" + ` ${rate} USD`}
                readonly=""
              />
              </div>

              <div className="Activate_upgrate " id="upgrade-act">
            

            <h6
              className="modal-title pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Enter Package Amount :
              
              
            </h6>
            <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                placeholder="Enter Package Amount"
                readonly=""
              />
            </div>
            <div className="Activate_upgrate">
            <h6
              className="modal-title  pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available Tron Balance :
              
              
            </h6>
            <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                placeholder="0 Tron"
                readonly=""
              />
            </div>
            <div className="Activate_upgrate">
            <h6
              className="modal-title pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available ULE Balance :
              
              
            </h6>
            <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                placeholder="0 ULE"
                readonly=""
              />
              </div>

          </div>
          </div>
       
        <div className="modal-body">
          <div className="popup_net">
            <div className="set_meta">
              <span className="metamaskConnection"> </span>
            </div>
            <div className="addNum">
              <div className="trxnumber">
                <div className="row rrp" >
                  {/* <div className="col-12 col-md-12 -col-xl-8 p-3" >
                    <div className="row mt-3">
                      <input
                        type="number"
                        value={amount}
                       
                        style={{
                          width: "40%",
                          height: "48px",
                          borderRadius: "7px",
                          marginLeft:"200px",
                          
                        }}
                        onChange={(e) =>
                          setAmount(e.target.value)
                        }
                        className="form5"
                        min="100"
                        placeholder="Enter Package Amount in USD"
                      /> 
                    </div>
                    <div className="row mt-3">
                     
                      <input
                        type="number"
                        // value={(amount * rate)}
                        disabled
                        style={{
                          width: "40%",
                          height: "48px",
                          borderRadius: "7px",
                         
                          backgroundColor: 'white'
                        }}
                        className="form5"
                        min="100"
                        placeholder={(`${amount}` * `${rate}` + " " + "Tron")}
                      />
                    
                    </div>
                    <div className="row mt-3">
                      <input
                        type="number"
                        // value={(amount * rate)}
                        disabled
                        style={{
                          width: "40%",
                          height: "48px",
                          borderRadius: "7px",
                         
                          backgroundColor: 'white'
                        }}
                        className="form5"
                        min="100"
                        placeholder={(`${amount}` * `${rate}` + " " + "ULE")}
                      /> 
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-12">
                    <div class="numbtn">

                     
                      <button className="btn" style={{width:'33%'}}>+ 100$</button>
                      <button className="btn" style={{width:'33%'}}>+ 200$</button>
                      <button className="btn" style={{width:'33%'}}>+ 500$</button>
                      </div>
                      <div class="numbtn">
                      <button className="btn" style={{width:'33%'}}>+ 1000$</button>
                      <button className="btn" style={{width:'33%'}}>+ 5000$</button>
                      <button className="btn" style={{width:'33%'}}>+ 10000$</button>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="numbtn">
                      <button className="reset">Reset</button>
                      </div>

                    </div>

                    <div className="col-md-12">
                      <div className="numbtn">
                      <button className="reset "><img
                              style={{  marginRight: '5px' }}
                              src={logo}
                              className="yellowImg up-rest"
                            /> UPGRADE</button>
                      </div>

                    </div>
                  </div>
                  
                </div>
              </div>
              {/* <div className="yeep_note">
                              <h4 style={{ margin: "10px 31px"}}>Note:</h4>
                              <ul>
                                <li>
                                  <p>Please ensure to connect Metamask wallet.</p>
                                </li>
                                <li>
                                <p> Please get ref check of input value before
                                  select the pacakage amount.</p>
                                </li>
                                <li>
                                <p> Min pacakage amount is 100 USD &amp; maximum
                                  is 10,000 USD.</p>
                                </li>
                                <li>
                                <p> Refrence rate of ule token taken from
                                  www.wyzthswap.org</p>
                                </li>
                              </ul>
                            </div>

                            <div className="yeep_footer">
                              <p style={{textAlign:'center'}}>© 2022 | yeepule.network</p>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      ) : (
        <div className="col-md-8" style={{ backgroundColor: 'white', marginTop: '25px', borderRadius: "11px", padding: '20px' }}>
        <div className="ule_logo" style={{ margin: "8px 41%" }}>
          {/* <img style={{height: "30px"}} src={logo1} /> */}
        </div>
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Activation</h4>
          </div>
        </div>
        <div
          className="modal-header"
          style={{
            paddingBottom: "10px !important",
            margin: "10px", borderRadius: '15px'
          }}
        >
          <br></br>
          <div className="avlbal row" style={{ padding: "20px" }}>
            <h6
              className="modal-title col-12 pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available ULE Token Balance :
              <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                style={{ color: "black", borderRadius: '10px', height: '40px', marginLeft: "5%" }}
                placeholder={`${balanceUle} Token`}
                readonly=""
              />
              {/* <span
                              id="tokenbalance"
                              style={{
                                paddingTop: "7px",
                                paddingBottom: "7px",
                              }}
                            >
                              {blnce} Token
                            </span> */}
            </h6>
            <h6
              className="modal-title col-12 pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Available ULE Tron Balance :
              <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                style={{ color: "black", borderRadius: '10px', height: '40px', marginLeft: "6.5%" }}
                placeholder={`${TrxBalance} Tron`}
                readonly=""
              />
              {/* <span
                              id="tokenbalance"
                              style={{
                                paddingTop: "7px",
                                paddingBottom: "7px",
                              }}
                            >
                              {blnce} Token
                            </span> */}
            </h6>
            <h6
              className="modal-title col-12 pb-2"
              id="exampleModal3Label2"
              style={{ color: "white" }}
            >
              Previous Package amount :
              <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                style={{ color: "black", borderRadius: '10px', height: '40px', marginLeft: "7.6%" }}
                placeholder={`    ${betaWallet?.activatupgradeamnt_trading} `}
                readonly=""
              />
              {/* <span
                              id="tokenbalance"
                              style={{
                                paddingTop: "7px",
                                paddingBottom: "7px",
                              }}
                            >
                              {betaWallet?.activatupgradeamnt_trading}
                            </span> */}
            </h6>
            <br />

            <h6 className="modal-title" style={{ color: "white" }}>
              Live Rate :
              <input
                type="text"
                className="input_width"
                id="txtchangevalue"
                style={{ color: "black", borderRadius: '10px', height: '40px', marginLeft: "3.5%" }}
                placeholder={`   ${ratematic} Tron` + "/" + ` ${rate} USD`}
                readonly=""
              />
            </h6>
          </div>
        </div>
        <div className="modal-body">
          <div className="popup_net">
            <div className="set_meta">
              <span className="metamaskConnection"> </span>
            </div>
            <div className="addNum">
              <div className="trxnumber">
                <div className="row rrp" >
                  <div className="col-12 col-md-12 -col-xl-8 p-3" >
                    <div className="row">
                      <input
                        type="number"
                        value={amount}
                        style={{
                          width: "74%",
                          height: "48px",
                          borderRadius: "7px",
                          marginLeft: "13%"
                        }}
                        onChange={(e) =>
                          setAmount(e.target.value)
                        }
                        className="form5"
                        min="100"
                        placeholder="Enter Package Amount in USD"
                      />
                    </div>
                    <div className="row mt-3">
                      <input
                        type="number"
                        // value={(amount * rate)}
                        disabled
                        style={{
                          width: "74%",
                          height: "48px",
                          borderRadius: "7px",
                          marginLeft: "13%",
                          backgroundColor: 'white'
                        }}
                        className="form5"
                        min="100"
                        placeholder={(`${amount}` * `${rate}` + " " + "Tron")}
                      />
                    </div>
                    <div className="row mt-3">
                      <input
                        type="number"
                        // value={(amount * rate)}
                        disabled
                        style={{
                          width: "74%",
                          height: "48px",
                          borderRadius: "7px",
                          marginLeft: "13%",
                          backgroundColor: 'white'
                        }}
                        className="form5"
                        min="100"
                        placeholder={(`${amount}` * `${rate}` + " " + "ULE")}
                      />
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-6 col-xl-4 p-3"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      marginLeft: '11%'
                    }}
                  >
                    {apiDate && (
                      <>
                        {isLoadingTrans ? (
                          <button
                            className="btn btn-success"
                            style={{ marginTop: "10px" }}
                            id="btnother"
                          >
                            <div
                              className="loaders"
                              style={{
                                height: "30px",
                                width: "30px",
                              }}
                            ></div>
                            Transaction is in progress
                          </button>
                        ) : (
                          <button
                            className="lg-btn"
                            style={{ minHeight: "45px", borderRadius: '6px', color: 'white' }}
                            onClick={()=>handleActivation()}
                          >
                            {/* <img
                                            src="assets/activateBlack.png"
                                            className="whImg"
                                          /> */}
                            <img
                              style={{ width: "14%", marginRight: '5px', borderRadius: "8px;" }}
                              src={logo}
                              className="yellowImg "
                            />
                            Activation
                          </button>
                          
                        )
                        
                        }
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="yeep_note">
                              <h4 style={{ margin: "10px 31px"}}>Note:</h4>
                              <ul>
                                <li>
                                  <p>Please ensure to connect Metamask wallet.</p>
                                </li>
                                <li>
                                <p> Please get ref check of input value before
                                  select the pacakage amount.</p>
                                </li>
                                <li>
                                <p> Min pacakage amount is 100 USD &amp; maximum
                                  is 10,000 USD.</p>
                                </li>
                                <li>
                                <p> Refrence rate of ule token taken from
                                  www.wyzthswap.org</p>
                                </li>
                              </ul>
                            </div>

                            <div className="yeep_footer">
                              <p style={{textAlign:'center'}}>© 2022 | yeepule.network</p>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      )}
     
    </>
  );
};
