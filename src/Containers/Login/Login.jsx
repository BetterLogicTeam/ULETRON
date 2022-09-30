import React from "react";
import "../Registration/Registration.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/actions/Login";
import Web3 from "web3";
import Confirm from "./confirm";
// import moment from "moment";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import TronWeb from "tronweb";

var interv = null;

function Login() {
  const [inputValue, setInputValue] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleLogin = async () => {
    console.log("Inputdata_login",inputValue);
    let res = await dispatch(loginAction(inputValue));
    console.log("LOgin_Api_Res",res);
    if (res) {
      // setTimeout(() => {
      

        history("/dashboard");
      // }, 1);
      // window.location.reload()
    } else {
      toast.error("Something went wrong ! ");
    }
  };
  // const handleLogin2 = async (ids) => {
  //   let res = await dispatch(loginAction(ids));
  //   if (res) {
  //     setTimeout(() => {
  //       setAccount("");
  //       nevigate("/dashboard");
  //     }, 1000);
  //     // window.location.reload()
  //   } else {
  //     toast.error("Something went wrong ! ");
  //   }
  // };

  const [account, setAccount] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  // setRegistered ,handleLogin
  const [chainId, setChainId] = useState(null);
  let mainAccount = "";
  async function tronConnect() {

    try {
      console.log("initial");
     mainAccount = await window?.tronWeb?.defaultAddress?.base58;
      console.log("main Account", mainAccount);
  
      if (mainAccount) {
        setAccount(mainAccount);
        localStorage.setItem("mainAccount", mainAccount);
        console.log("mainAccount", mainAccount);
        setTimeout(() => {
          // getBalanceOfAccount();
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


  
  useEffect(() => {
    setTimeout(() => {
    
      tronConnect()
    }, 100);
    return () => {
    
      if (interv) {
        clearInterval(interv);
      }
    };
  }, []);
  
  return (
    <div>
      <div id="reg-layout">
        <div class="Toastify">
        {openLogin && <Confirm handleLogin={handleLogin} setRegistered={setOpenLogin} />}
          <div class="container">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-11" style={{ marginTop: "-60px"}}>
                <div class="row bx_hover">
                  <div className="col-md-3"></div>
                  <div class="col-md-6 bdr_non">
                    <div class="reg-box">
                      <div class="reg-content">
                        <div class="login_hd">
                        <img src="assets/images/logo.png" alt="" style={{width:"50%"}} />
                          <h2>
                            <a  className="text-de" href="index.html"  style={{ color: "#fff", fontSize: "smaller" }}>Login</a>
                          </h2>
                        </div>
                        <div class="subtitle">
                          Automatic login if you have Tron wallet:
                        </div>
                        
                        <span
                          id="metamaskConnections"
                          style={{ color: "red", fontSize: "14px" }}
                        >
                          {console.log("Addresss:",account)}
                         {account === null ? (
                        <span id="metamaskConnections" style={{ color: "red" }}>
                          Tron is not connected..!..Wait...
                        </span>
                      ):
                      (
                        <span id="metamaskConnections" style={{ color: "green" }}>
                        Tron is  connected..!
                      </span>
                      )
                    
                    }
                      {chainId !== null && chainId !== 303 && (
                        <span id="metamaskConnections" style={{ color: "red" }}>
                          Please Select Tron Network ..!
                        </span>
                      )}
                        </span>
                       
                           <a
                            class="  btn left-btn-styl loginbtn text-de lg-btn" 
                            href="/registration"
                            title="Go To Home"
                            id="gotohome"
                          >
                              Automatic Sign up
                          </a>
                         

                        <form>
                          <div class="form-row">
                            <input
                              id="loginid"
                              class="input_bg form-input lg-btn"
                              type="text"
                              maxlength="100"
                              onChange={handleChangeInput}
                              value={inputValue}
                              oninput="return nameNumValidation(this);"
                              placeholder="Please enter ID or Tron address "
                            />
                          </div>
                          <div class="form-row">
                          <input
                            type="button"
                            class="btn loginbtn lg-btn"
                            value="Login"
                            onClick={()=>setOpenLogin(true)}
                            id="myBtn25"
                            readonly
                          />
                         
                           <a
                            class=" btn left-btn-styl loginbtn text-de lg-btn" 
                            href="/"
                            title="Go To Home"
                            id="gotohome"
                          >
                            Go To Home
                          </a>
                          
                           
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loader">
        <center
          style={{
            zIndex: "99999",
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%);",
          }}
        >
          <span class="loaderbg"></span>
          <h6
            style={{
              fontWeight: "700",
              fontSize: "16px",
              zIndex: "99999",
              color: "#fff;",
            }}
          >
            {" "}
            Please wait..
          </h6>
        </center>
      </div>
    </div>
  );
}

export default Login;
