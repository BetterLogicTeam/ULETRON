
 
import TronWeb from "tronweb";


async function tronConnect() {

  try {
    console.log("initial");
    mainAccount = await window?.tronWeb?.defaultAddress?.base58;
    console.log("main Account", mainAccount);

    if (mainAccount) {
      setAccountAddress(mainAccount);
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
    tronConnect();
  }, 2000);
}, []);

