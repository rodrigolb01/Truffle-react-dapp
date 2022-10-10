import React from 'react'
import SolRsaVerify from '../contracts/SolRsaVerify.json';
const {ethers} = require('ethers');
const assert = require('assert')

const asciiToHex = (str) => {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
}

const RsaSigner = () => {
  //setup the contract ABI
  let account = null;
  let provider = null;
  let contractdeployed = null;
   
  const connect = async() => {
    //get signer address from Metamask for making transactions
    if(typeof window.ethereum !== "undefined")
    {
      account = await window.ethereum.request({method: "eth_requestAccounts"})
      console.log("your account");
      console.log(account);
    }
    else
    {
      window.alert("Error! Unable to recover the signer");
    }
    //get provider for connecting to web3
    if(typeof window.web3 !== "undefined")
    {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("your provider");
      console.log(provider);

      const signer = provider.getSigner();

      contractdeployed = new ethers.Contract("0x58FD3338c09FE8dB7f9A0834e283d81DdE2C3EFf", SolRsaVerify.abi, signer);
      console.log("your contract:");
      console.log(contractdeployed);

      let result = await verify(contractdeployed);
      console.log('result:');
      console.log(result)

    }
    else 
    {
      window.alert("Error! MetaMask is not installed, cannot connect to web3");
    }
  }

  const verify = async(deployedContract) => {
    
    const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
    const Msg = asciiToHex("hello world")
    const S   = "079bed733b48d69bdb03076cb17d9809072a5a765460bc72072d687dba492afe951d75b814f561f253ee5cc0f3d703b6eab5b5df635b03a5437c0a5c179309812f5b5c97650361c645bc99f806054de21eb187bc0a704ed38d3d4c2871a117c19b6da7e9a3d808481c46b22652d15b899ad3792da5419e50ee38759560002388"
    const nn  = "DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"

    console.log("parameters:");
    console.log(`${"0x"+Msg},${"0x"+S},${"0x"+e},${"0x"+nn}`)

    let verify = assert.equal((await deployedContract.pkcs1Sha256VerifyRaw("0x"+Msg,"0x"+S,"0x"+e,"0x"+nn)).toNumber(),0)
    console.log(verify);
    
    return verify;

  }

  return (
    <div>
      <h3>Verify</h3>
      <button onClick={() => {connect()}}>click ME!</button>
    </div>
  )
}

export default RsaSigner