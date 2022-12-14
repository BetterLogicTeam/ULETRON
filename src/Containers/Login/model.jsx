import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from "web3";
import { API} from "../../Redux/actions/API";
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
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const metamask = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        let chain = await web3.eth.getChainId();
        setChainId(chain);
        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
          let chain = await web3.eth.getChainId();
          setChainId(chain);
        });
      }
    } catch (error) {
      console.log("error message", error?.message);
    }
  };

  const registered = async (hash) => {
  console.log("Hash_Register",hash);
    try {

      console.log("Account Api",account);
      const res = await API.post(`/registration`, {
        "sid":sId,
        "accountnumber":account,
        "position":1,
        "amount":10,
        "traxn":hash
        
       
      });
      console.log(res);
      handleLogin2(account);
     
      toast.success("Successfully registered !");
    } catch (e) {
      console.log("error", e);
      toast.error("Something went wrong !");
    }
  };
  const handleLogin2 = async (ids) => {
    let res = await dispatch(loginAction(ids));
    console.log("API Res",res);
    if (res) {
      setTimeout(() => {
        nevigate("/dashboard/Home");
      }, 1000);
      // window.location.reload()
    } else {
      toast.error("Something went wrong ! ");
    }
  };



  const TronContract=async()=>{
    let acc = await loadWeb3();
      
    if (acc == "No Wallet") {
        toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
        toast.error("Wrong Newtwork please connect to test net")
    } else {

      try{
        // console.log("Tayyab");
        const web3 = window.web3;
        let nftContractOf = new web3.eth.Contract(troncontract_abi, troncontract);
        let ULEtokenOf = new web3.eth.Contract(ule_token_abi, ULE_token);

        let ValueinUlE = await nftContractOf.methods.ValueinULE().call();
        let Valueinbnb = await nftContractOf.methods.Valueinbnb().call();
        let a=0.0001
        // ValueinUlE=Number(ValueinUlE) + a;
        console.log("ValueinUlE",ValueinUlE);
        console.log("Valueinbnb",Valueinbnb);

        await ULEtokenOf.methods.approve(troncontract,ValueinUlE.toString()).send({
          from: acc
        })

       

        let hash= await nftContractOf.methods.UlebuyRouter(ValueinUlE.toString()).send({
          from: acc,
          value:Valueinbnb
        })


        hash = hash.transactionHash
        console.log("Hash_here",hash);

        settrn(hash)
        registered(hash)


      }catch(e){
        console.log("Error While calling Sell Fuction",e);
      }

    }
  }

  useEffect(() => {
    metamask();
  }, []);
  return (
    <div>
      <ToastContainer />

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
          style={{ fontSize: "20px" }}
        >
          Register an Account
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            placeholder="Please enter upline ID  "
            fullWidth
            value={sId}
            onChange={(e) => setSId(e.target.value)}
          />
          <DialogContentText className="mt-1 textStyle">
            Enter the account id
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center align-items-center">
          <Button onClick={TronContract} className="loginbtn">
            Ok
          </Button>
          <Button onClick={handleClose} className="loginbtn">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
