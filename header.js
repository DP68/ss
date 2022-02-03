import React, { useState,useEffect } from "react";
import styled from "styled-components";
import "../../assets/styles/custom.css";
import Utils from "../../utility";
import Jazzicon from "react-jazzicon";
import { useWeb3React } from "@web3-react/core"
import { makeStyles } from "@material-ui/core/styles/";
import { Column, Row } from "simple-flexbox";
const Web3 = require("web3");

const { ethereum } = window;

const UserLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 7px;
`;
const HeaderContainer = styled.div`
  width: 100%;
  background: #091f5c 0% 0% no-repeat padding-box;
  opacity: 1;
  padding: 5px;
`;
const XDCContainer = styled.div`
  background: #324988;
  display: flex;
  color: white;
  border-radius: 5px;
  align-items: center;
  padding: 0 0 0 10px;
`;

const UserContainer = styled.div`
  width: 190px;
  background: #3e579a;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
`;
const SpaceBetween = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const Button = styled.button`
  border: 1px solid white;
  background: transparent;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  padding: 5px 20px 5px 20px;
`;

function Header(props) {
const {active, account, library, connector, activate, deactivate } = useWeb3React()
const [wallet, setwallet] = useState("");
useEffect(() => {
      
  if (window.ethereum) {//the error line
    window.web3 = new Web3(window.ethereum);

    try {
      window.ethereum.enable();

    let web3;
    web3 = new Web3(window.web3.currentProvider);
    console.log("+++",web3);
    window.ethereum.enable();
    const accounts = web3.eth.getAccounts().then((accounts) => {
      if (!accounts || !accounts.length) {
        return;
      }
      setwallet(accounts[0])
    });


  } catch (err) {
    alert("Something went wrong.");
  }
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider);
  let web3;
  web3 = new Web3(window.web3.currentProvider);
  console.log("+++",web3);
  window.ethereum.enable();

  const accounts = web3.eth.getAccounts().then((accounts) => {
      if (!accounts || !accounts.length) {
        return;
      }
      setwallet(accounts[0])
    });
} else {
  Utils.apiFailureToast("Please install XDCPay extension");
}

  }, []);
  async function connectToWallet(){

    if (window.ethereum) {//the error line
      window.web3 = new Web3(window.ethereum);
  
      try {
        window.ethereum.enable();

    let web3;
    web3 = new Web3(window.web3.currentProvider);
        const conn = await window.web3.currentProvider._events.disconnect[0]();
    let accounts = web3.eth.getAccounts().then((accounts) => {
      if (!accounts || !accounts.length) {
        Utils.apiFailureToast("Wallet is not connected");
        return;
      }
      console.log("accounts[0] ",accounts[0])
    });

  } catch (err) {
    alert("Something went wrong.");
  }
  }
    
   else {
    Utils.apiFailureToast("Please install XDCPay extension");
  }
  }
  return (
    <HeaderContainer>
      <SpaceBetween>
        <div >
        </div>
          <XDCContainer>
            <div></div>
        </XDCContainer>
        
        <button  onClick={connectToWallet}>
                {wallet ?  <>{wallet ? <><Jazzicon  diameter={20} seed={Math.round(Math.random() * 10000000)}/>  <div className="address-image">{wallet.substr(0, 11)}</div></> : " "}...
                              {wallet
                                ?  wallet.substr(wallet.length - 5, 5)
                                : ""}</> : <><div className="circle"></div><p className="connect">Connect Wallet</p></>}
              </button>
      </SpaceBetween>
    </HeaderContainer>
  );
}
export default Header;
