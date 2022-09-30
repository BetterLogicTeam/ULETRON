import React, { useState, useEffect } from "react";
import "./Registration.css";
import Popup from "reactjs-popup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from "web3";
import { API} from "../../Redux/actions/API";
import Model from "../Registration/model";
// import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { loginAction } from "../../Redux/actions/Login";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import { loadWeb3 } from "../../apis/api";
import { troncontract, troncontract_abi, ULE_token, ule_token_abi } from "../Activate/constants";
export default function FormDialog({ setRegistered }) {
  const nevigate=useNavigate();
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const [trn, settrn] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRegistered(false);
  };
  const [sId, setSId] = useState(null);
  // const [account, setAccount] = useState(null);
  // const [chainId, setChainId] = useState(null);
  // const metamask = async () => {
  //   let isConnected = false;
  //   try {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.ethereum);
  //       await window.ethereum.enable();
  //       isConnected = true;
  //     } else if (window.web3) {
  //       window.web3 = new Web3(window.web3.currentProvider);
  //       isConnected = true;
  //     } else {
  //       isConnected = false;
  //     }
  //     if (isConnected === true) {
  //       const web3 = window.web3;
  //       let accounts = await web3.eth.getAccounts();
  //       setAccount(accounts[0]);
  //       let chain = await web3.eth.getChainId();
  //       setChainId(chain);
  //       window.ethereum.on("accountsChanged", async function (accounts) {
  //         setAccount(accounts[0]);
  //         let chain = await web3.eth.getChainId();
  //         setChainId(chain);
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error message", error?.message);
  //   }
  // };

  // const registered = async (hash) => {
  // console.log("Hash_Register",hash);
  //   try {

  //     console.log("Account Api",account);
  //     const res = await API.post(`/registration`, {
  //       "sid":sId,
  //       "accountnumber":account,
  //       "position":1,
  //       "amount":10,
  //       "traxn":hash
        
       
  //     });
  //     console.log(res);
  //     handleLogin2(account);
     
  //     toast.success("Successfully registered !");
  //   } catch (e) {
  //     console.log("error", e);
  //     toast.error("Something went wrong !");
  //   }
  // };
  // const handleLogin2 = async (ids) => {
  //   let res = await dispatch(loginAction(ids));
  //   console.log("API Res",res);
  //   if (res) {
  //     setTimeout(() => {
  //       nevigate("/dashboard/Home");
  //     }, 1000);
  //     // window.location.reload()
  //   } else {
  //     toast.error("Something went wrong ! ");
  //   }
  // };



  // const TronContract=async()=>{
  //   let acc = await loadWeb3();
      
  //   if (acc == "No Wallet") {
  //       toast.error("No Wallet Connected")
  //   }
  //   else if (acc == "Wrong Network") {
  //       toast.error("Wrong Newtwork please connect to test net")
  //   } else {

  //     try{
  //       // console.log("Tayyab");
  //       const web3 = window.web3;
  //       let nftContractOf = new web3.eth.Contract(troncontract_abi, troncontract);
  //       let ULEtokenOf = new web3.eth.Contract(ule_token_abi, ULE_token);

  //       let ValueinUlE = await nftContractOf.methods.ValueinULE().call();
  //       let Valueinbnb = await nftContractOf.methods.Valueinbnb().call();
  //       let a=0.0001
  //       // ValueinUlE=Number(ValueinUlE) + a;
  //       console.log("ValueinUlE",ValueinUlE);
  //       console.log("Valueinbnb",Valueinbnb);

  //       await ULEtokenOf.methods.approve(troncontract,ValueinUlE.toString()).send({
  //         from: acc
  //       })

       

  //       let hash= await nftContractOf.methods.sell(ValueinUlE.toString()).send({
  //         from: acc,
  //         value:Valueinbnb
  //       })


  //       hash = hash.transactionHash
  //       console.log("Hash_here",hash);

  //       settrn(hash)
  //       registered(hash)


  //     }catch(e){
  //       console.log("Error While calling Sell Fuction",e);
  //     }

  //   }
  // }

  // useEffect(() => {
  //   metamask();
  // }, []);


  const [rate , setRate] = useState();
  const [ratematic , setRateMatic] = useState();
  const user = localStorage?.getItem("user");
  const LiveRateAPI = async () => {
      try {
        let res = await API.get(`/live_rate?id=${user}`);
        res = res.data.data[0];
        console.log("res", res);
        setRate(res.usdperunit);
        
      } catch (e) {
        console.log("Error While Fatch Dashboard API", e);
      }
    };
  
    useEffect(() => {
      LiveRateAPI();
    }, [])

       const user1 = localStorage?.getItem("user");
    const LiveRateMaticAPI = async () => {
      try {
        let res = await API.get(`/live_rate_matic?id=${user1}`);
        res = res.data.data[0];
        console.log("res", res);
        setRateMatic(res.usdperunit);
        
      } catch (e) {
        console.log("Error While Fatch Dashboard API", e);
      }
    };
  
    useEffect(() => {
      LiveRateMaticAPI();
    }, [])
    // const [ok, setOk] = useState("");

  return (
    <div>
      <ToastContainer />

       {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"style={{color:"white",borderBottom:"0px"}}>  Enter Upline ID</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            placeholder=" Enter upline ID or referral link "
            fullWidth
            value={sId}
            onChange={(e) => setSId(e.target.value)}
            required
          />
      <div class="modal-footer"> 
      <Popup trigger={<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>} 
     position="right center">
      <div>GeeksforGeeks</div>
      <button>Click here</button>
    </Popup>
        
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      {/* {ok && <Model setRegistered={setOk} />} */}
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        className="modalContainer"
      >
        <DialogTitle
          id="form-dialog-title"
          className="d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px"}}
        >
          <span style={{color:'white'}}>
          Enter Upline ID
          </span>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            placeholder=" Enter upline ID or referral link "
            fullWidth
            value={sId}
            onChange={(e) => setSId(e.target.value)}
            required
          />
          {/* <DialogContentText className="mt-1 textStyle">
            Enter the account id or referral link
          </DialogContentText> */}
        </DialogContent>
        <DialogActions className="d-flex justify-content-center align-items-center">
          <Button  className="loginbtn btn mr_5" id="myBtn123" >
          {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
<Popup trigger={<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ok</button>} 
     position="right center">
      <div>GeeksforGeeks</div>
      <button>Click here</button>
    </Popup>
</button>


     {/* <Popup>
      trigger{
  <button id="myBtn123" class="btn mr_5" >
    OK
  </button>
}
 <div id="myModal" class="" >
<div
  class="modal-content boxset set_transfort2"
  style={{ marginTop: "-300px" , marginLeft:'11%', position:"fixed"}}
>
  <h4>Referral Confirmation</h4>
  <p style={{color:'black'}}>
    Your Current Referral ID is{" "}
    <span>778899</span>
  </p>
  <div class="maticRate">
    <div>
      <span>Matic</span>
      <input type="number" placeholder={`${rate}`} name="number"  readonly="" />
    </div>
    <div>
      <span>ULE</span>
      <input type="number" placeholder={`${ratematic}`} name="number"   readonly=""/>
    </div>
  </div>

  <select class="selecOpt" style={{marginLeft:'14%'}}>
    <option value="Left">Left</option>
    <option value="Right">Right</option>
  </select>
  <div class="uplineBtn modal_btn">
    <button class="btn mr_5">Proceed</button>
    <a
      href="index.html"
      class="btn closeBtn"
      style={{ width: "68%",marginLeft: "2%", fontSize:'14px', height: "32px",  paddingTop: "5px;"}}
    >
      No I want to change ID
    </a>
  </div>
</div>
</div>
</Popup>   */}
          </Button>
          <Button onClick={handleClose} className="loginbtn">
          <a
                                href="#"
                                class="btn closeBtn"
                                style={{ marginLeft: "2%" }}
                              >
                                Close
                              </a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
// \






// <Popup
// trigger={
//   <button id="myBtn123" class="btn mr_5">
//     OK
//   </button>
// }
// position="right center"
// >
//  <div id="myModal" class="">
// <div
//   class="modal-content boxset set_transfort2"
//   style={{ marginTop: "-300px" , marginLeft:'30%' }}
// >
//   <h4>Referral Confirmation</h4>
//   <p>
//     Your Current Referral ID is{" "}
//     <span>778899</span>
//   </p>
//   <div class="maticRate">
//     <div>
//       <span>Matic</span>
//       <input type="number" placeholder={`${rate}`} name="number"  readonly="" />
//     </div>
//     <div>
//       <span>ULE</span>
//       <input type="number" placeholder={`${ratematic}`} name="number"   readonly=""/>
//     </div>
//   </div>

//   <select class="selecOpt" style={{marginLeft:'14%'}}>
//     <option value="Left">Left</option>
//     <option value="Right">Right</option>
//   </select>
//   <div class="uplineBtn modal_btn">
//     <button class="btn mr_5">Proceed</button>
//     <a
//       href="index.html"
//       class="btn closeBtn"
//       style={{ width: "68%",marginLeft: "2%" }}
//     >
//       No I want to change ID
//     </a>
//   </div>
// </div>
// </div>
// </Popup>