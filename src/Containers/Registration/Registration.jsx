import React, { useState, useEffect } from 'react'
import './Registration.css'
import Popup from 'reactjs-popup'
import TextField from '@material-ui/core/TextField'
import { API } from '../../Redux/actions/API'
import Web3 from 'web3'
import Button from '@material-ui/core/Button'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { loginAction } from '../../Redux/actions/Login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadWeb3 } from '../../apis/api'
import { troncontract, troncontract_abi, ULE_token, ule_token_abi } from '../Activate/constants'
import TronWeb from 'tronweb'
import { Dna } from 'react-loader-spinner';
import axios from 'axios'


// import Model from "../Registration/model";

function Registration() {

  const nevigate = useNavigate()
  const history = useNavigate();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [trn, settrn] = useState('')
  const [account, setaccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setloader] = useState(false)
  const [positionselect, setpositionselect] = useState(1)
  const [isVisible, setisVisible] = useState(false)
  const [isVisible2, setisVisible2] = useState(false)
  const [NewUserID, setNewUserID] = useState()


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // setRegistered(false);
  }
  const [sId, setSId] = useState(null)
  let [rate, setRate] = useState(0)
  let [ratematic, setRateMatic] = useState()
  const user = localStorage?.getItem('user')
  const LiveRateAPI = async () => {
    try {
      let res = await API.get(`/live_rate_USD_Tron?id=${user}`)
      console.log('reeeeees', res.data.data[0].limits)
      let limits  = res.data.data[0].limits
      limits = limits * 10
      setRate(limits)
    } catch (e) {
      console.log('Error While Fatch Dashboard API', e)
    }
  }

  useEffect(() => {
    LiveRateAPI()
  }, [])

  // Tron connection here---------------------------------
  const [tronAddress, settronAddress] = useState('')
  let mainAccount = ''

  async function tronConnect() {
    try {
      console.log('initial')
      mainAccount = await window?.tronWeb?.defaultAddress?.base58
      console.log('main Account', mainAccount)

      if (mainAccount) {
        settronAddress(mainAccount)
        setaccount(mainAccount)
        let res = await axios.post('https://ulematic.herokuapp.com/CheckRegisterUser', {
          "accountnumber": mainAccount
        })

        console.log("CheckRegiter", res.data.data);

        if (res.data.data.result == "Free Registered. Please Pay payment !!") {
          setisVisible2(true)
        }



        localStorage.setItem('mainAccount', mainAccount)
        console.log('mainAccount', mainAccount)
        setTimeout(() => {
          // getBalanceOfAccount();
        }, 100)
      } else {
        const HttpProvider = TronWeb.providers.HttpProvider
        const fullNode = new HttpProvider('https://api.shasta.trongrid.io')
        const solidityNode = new HttpProvider('https://api.shasta.trongrid.io')
        const eventServer = 'https://api.shasta.trongrid.io/'
        const gettronWeb = new TronWeb(fullNode, solidityNode, eventServer)
        setTimeout(() => {
          // getData();
        }, 100)

        toast.warning('Please login or install tron wallet!')
      }
    } catch (error) {
      toast.error(error.message)

      console.log('errorrrrr', error.message)
    }
  }




  useEffect(() => {
    setTimeout(() => {
      tronConnect()
    }, 2000)
  }, [])

  // ------------------------------------------------------------------

  const user1 = localStorage?.getItem('user')
  const LiveRateMaticAPI = async () => {
    try {
      let res = await API.get(`/live_rate_matic?id=${user1}`)
      res = res.data.data[0]
      console.log('res', res)
      setRateMatic(res.usdperunit * 10)
    } catch (e) {
      console.log('Error While Fatch Dashboard API', e)
    }
  }

  useEffect(() => {
    LiveRateMaticAPI()
  }, [])

  // const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //     const handleClose = () => {
  //       setOpen(false);
  //       setRegistered(false);
  //     };
  // const [sId, setSId] = useState(null);
  // const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null)
  // const tronConnects = async () => {
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
  //       settronAddress(accounts[0]);
  //       let chain = await web3.eth.getChainId();
  //       setChainId(chain);
  //       window.ethereum.on("accountsChanged", async function (accounts) {
  //         settronAddress(accounts[0]);
  //         let chain = await web3.eth.getChainId();
  //         setChainId(chain);
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error message", error?.message);
  //   }
  // };

  const registered = async (hash) => {
    // console.log("Hash_Register",hash);
    tronConnect()
    try {

      console.log('Account Api', account)
      setloader(true)
      const res = await API.post(`/registration_v1`, {

        sid: sId,
        accountnumber: account,
        position: positionselect,
        amount: 10,
        traxn: account,
        // traxn:"a7f77af7732431cb38c1b0ce18361fd4d500aedbf9a039bdc9151230fa9600e5"

      })
      console.log("Register_data", res.data.data)
      if (res.data.data.result == "waiting") {
        setNewUserID(res.data.data.outputuid)
        console.log(res.data)
        setisVisible(false)
        setisVisible2(true)
        localStorage.setItem('NewUserID', res.data.data.outputuid)
        setloader(true)
        // setTimeout(() => {
        //   handleLogin2(tronAddress)
        // }, 80000);
        toast.success('Registered Successfully')

      } else {
        toast.error('Account Already Resgistered with this ID')

        nevigate('/login')
        setloader(false);
        // setisVisible2(true)
        // setisVisible(false)



      }
      // handleLogin2(tronAddress)

      // toast.success('Successfully registered !')
      setloader(false);


    } catch (e) {
      console.log('error', e)
      toast.error()
      setloader(false);


    }
  }
  const handleLogin2 = async (ids) => {
    setloader(true)
    console.log('UserAddress', ids)
   
    let res = await dispatch(loginAction(ids))
    console.log('API Res', res)
    if (res) {
      setTimeout(() => {
        nevigate('/dashboard')
      }, 1000)
      // window.location.reload()
    } else {
      toast.error('Something went wrong ! ')
      setloader(false);

    }
  }

  let Userid=localStorage.getItem('NewUserID')
  console.log("NEWUSERIDHER",Userid);


  const Register_Hash = async (hash) => {
    try {

      let res = await axios.post('https://ulematic.herokuapp.com/UpdateRegisterHash', {
        
          "uid": Userid,
          "accountnumber": account,
          "traxn": hash 
        }
      )


      console.log("Register_Hash",res);
      setTimeout(() => {
        handleLogin2(account)
      }, 80000);

    } catch (e) {
      console.log("Erreo while call ing Register_Hash API", e);
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     tronConnects();
  //   }, 2000);
  // }, []);

  // 50 50 _______________________________----------------------------------------

  const CONTRACT_ADDRESS = 'TP1H8njtdn8y2J21F2nEb2Ska9cUByAVNY'
  const Token_contract_Address = 'TLcKN2SBTAhiuUmkCvb86hRGdnV42cGyrt'

  const SellToken = async () => {


    try {
      setIsLoading(true);
      let respon = await dispatch(loginAction(tronAddress));
      console.log("LOgin_Api_Res", respon);
      // setTimeout(() => {
      if (respon) {
        history("/dashboard");
        // window.location.reload()
      }
      else {
        // let Token_contract = await window?.tronWeb?.contract().at(Token_contract_Address)
        let contract = await window?.tronWeb?.contract().at(CONTRACT_ADDRESS)
        // ratematic=ratematic*1000000000000000000
        // ratematic=parseInt(ratematic).toString()
        console.log("hassaan", rate)
      rate = rate * 1000000
      
        rate = parseInt(rate).toString()
        console.log("asadas", rate)
        await contract.buy().send({
          // shouldPollResponse: true,
          callValue: rate,
          feeLimit: 100000000
        })

          .then(async (hash) => {
            if (hash != '') {
              try {
                console.log('Hash:', hash, '\n')
                toast.success('Transaction is complete')
                setloader(true)

                Register_Hash(hash)
               
                setIsLoading(false);

              } catch (e) {
                console.log('Error', e)
                setIsLoading(false);

              }
            } else {
              console.log('Not Get Hash')
              setIsLoading(false);

            }
          })
          .catch((e) => {
            toast.error(e.message)
            console.log('Error while caling sell Fuction', e)
            setIsLoading(false);

          })
      }


    } catch (e) {
      console.log('Error In Sell function', e)
      setIsLoading(false);

    }
  }


  const chackfunction = async () => {
    setIsLoading(true);

    setTimeout(() => {
      registered()
    }, 60000);
  }

  return (
    <div>
      <div id="root">
        {loader == true || account == null ?
          <>
            <div className='LoaderSpinner'>
              <Dna
                visible={true}
                height="180"
                width="180"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          </>

          : <></>}
        <div id="reg-layout">
          <div class="Toastify"></div>
          {/* {registered && <Model setRegistered={setRegistered} />} */}

          <div class="container">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-11" style={{ marginTop: '-60px' }}>
                <div class="row bx_hover">
                  <div className="col-md-3">

                  </div>
                  <div class="col-md-6 bdr_non">
                    <div class="reg-box">
                      <div class="reg-content">
                        <div class="login_hd">
                          <img src="assets/images/logo.png" alt="" style={{ width: "50%" }} />
                          <br />
                          <h2>
                            <a className="text-de" href="index.html" style={{ color: '#fff', fontSize: 'smaller' }}>
                              Registration
                            </a>
                          </h2>
                        </div>
                        <div class="subtitle">Automatic login if you have Tron wallet:</div>


                        {
                          account == null ? (<span id="metamaskConnections" style={{ color: 'red', fontSize: '14px' }}>
                            Tron is not connected..!..Wait...
                          </span>) : (<span id="metamaskConnections" style={{ color: 'green', fontSize: '14px' }}>
                            Tron is  connected .
                          </span>)
                        }
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" class="btn lg-btn btn left-btn-styl loginbtn text-de lg-btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Register
                        </button>

                        {/* <!-- Modal --> */}
                        <div
                          class="modal fade "
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content pop-up-add uperpop" >
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  {' '}
                                  Enter Upline ID
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                type="number"
                                style={{ border: 'solid 2px' }}
                                placeholder=" Enter upline ID or referral link "
                                fullWidth
                                value={sId}
                                onChange={(e) => setSId(e.target.value)}
                                required
                              />
                              <div class="">

                                <button
                                  type="button"
                                  class="btn btn-secondary lg-btn"
                                  style={{ width: '49%' }}
                                  data-bs-dismiss="modal"
                                  onClick={() => setisVisible(true)}
                                >
                                  OK
                                </button>
                                <a
                                  href="#"
                                  onClick={handleClose}
                                  class="btn lg-btn"
                                  style={{ marginLeft: '2%', backgroundColor: '#fbc50b', width: '48%', color: 'white' }}
                                >

                                  Close
                                </a>
                              </div>
                            </div>
                          </div>







                        </div>
                        {
                          isVisible ?
                            <div id="myModal" class="">
                              <div
                                class="modal-content boxset set_transfort2" id='model-add'
                                style={{ marginTop: '-340px', position: 'fixed' }}
                              >
                                <h4 style={{ color: 'white' }}>Referral Confirmation</h4>
                                <p style={{ color: 'white' }}>
                                  Your Current Referral ID is <span>{sId}</span>
                                </p>
                                <div class="maticRate" style={{ marginLeft: '-9%' }}>
                                  <div>
                                    <span style={{ color: 'white' }}>Tron</span>
                                    <input type="number" style={{ backgroundColor: "rgb(32 15 94)", color: 'white' }} placeholder={`${rate}`} name="number" readonly="" />
                                  </div>
                                  {/* <div>
                                  <span style={{color:'white'}}>ULE</span>
                                  <input type="number" style={{ backgroundColor: "rgb(32 15 94)" ,color:'white'}} placeholder={`${ratematic}`} name="number" readonly="" />
                                </div> */}
                                </div>

                                <select class="selecOpt" id='selecOpt-1' style={{ marginLeft: '14%', backgroundColor: "rgb(32 15 94)", color: 'white' }} onChange={(e) => setpositionselect(e.target.value)}>
                                  <option value="1" style={{ color: 'white', }}>Left</option>
                                  <option value="2" style={{ color: 'white', }}>Right</option>
                                </select>
                                <div class="uplineBtn modal_btn">
                                  <button class="btn mr_5 lg-btn" style={{ color: 'white', }} onClick={() => registered()} disabled={isLoading}>
                                    {isLoading ? (
                                      <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                      </div>
                                    )
                                      :
                                      <>Proceed</>

                                    }

                                  </button>
                                  <a
                                    href="#"
                                    class="btn closeBtn lg-btn"
                                    style={{
                                      width: '68%',
                                      marginLeft: '2%',
                                      fontSize: '14px',
                                      color: 'white',
                                      height: '32px',
                                      paddingTop: '5px;',
                                    }}
                                  >
                                    No I want to change ID
                                  </a>
                                </div>
                              </div>
                            </div> :
                            <></>

                        }

                        {
                          isVisible2 ?
                            <div id="myModal " class="mypop">
                              <div
                                class="modal-content boxset set_transfort2"
                                id="model-add"
                                style={{ marginTop: '-340px', position: 'fixed' }}
                              >
                                <h4 style={{ color: 'white' }}>Payment here</h4>
                                <p style={{ color: 'white' }}>
                                  Your Current Referral ID is <span>{Userid}</span>
                                </p>
                                <div class="maticRate" style={{ marginLeft: '-9%' }}>
                                  <div>
                                    <span style={{ color: 'white' }}>Tron</span>
                                    <input
                                      type="number"
                                      style={{ backgroundColor: 'rgb(32 15 94)', color: 'white' }}
                                      placeholder={`${rate}`}
                                      name="number"
                                      readonly=""
                                    />
                                  </div>
                                </div>
                                <div style={{ display: 'flex', marginLeft: '2%' }}>
                                  <button
                                    class="btn mr_5 lg-btn"
                                    style={{ color: 'white' }}
                                    onClick={() => SellToken()}
                                    // onClick={()=>About()}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? (
                                      <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                      </div>
                                    ) : (
                                      <>Pay</>
                                    )}
                                  </button>

                                  <a
                                    href="#"
                                    class="btn closeBtn lg-btn"
                                    style={{
                                      width: '49%%',
                                      marginLeft: '2%',
                                      fontSize: '14px',
                                      color: 'white',
                                      height: '40px',
                                      paddingTop: '5px;',
                                    }}
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </div>


                            :
                            <></>
                        }

                        <form>
                          <div class="form-row">
                            <input
                              id="loginid"
                              class="input_bg form-input lg-btn"
                              type="text"
                              maxlength="100"
                              oninput="return nameNumValidation(this);"
                              placeholder="Please enter ID or Tron address"
                            />
                          </div>
                          <div class="form-row">
                            {/* <input
                              type="button"
                              class="btn loginbtn lg-btn"
                              value="Connect to Wallet"
                              id="myBtn25"
                              readonly
                            /> */}
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
            zIndex: '99999',
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%);',
          }}
        >
          <span class="loaderbg"></span>
          <h6
            style={{
              fontWeight: '700',
              fontSize: '16px',
              zIndex: '99999',
              color: '#fff;',
            }}
          >
            {' '}
            Please wait..
          </h6>
        </center>
      </div>
    </div>
  )
}

export default Registration
