import React from 'react'
import SolRsaVerify from '../contracts/SolRsaVerify.json';
import sha256 from 'crypto-js/sha256';
import { readFile } from 'fs';
import { KJUR } from 'jsrsasign';
import forge from 'node-forge'

const crypto = require("crypto");
const fs = require('fs');
const rs = require("jsrsasign");
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
      //connect to ethereum
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("your provider");
      console.log(provider);

      const signer = provider.getSigner();

      //setup for signing
 
          //// testing sinature using Crypto (unsupported in browser)

      // const privateKey = fs.readFileSync('../keys/private.key', {encoding: 'utf-8', flag: 'r'});
      // const publicKey = fs.readFileSync('../keys/public.key', {encoding: 'utf-8'});

      // const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAzg1x9iyx1gF2QRP4mllhD3wFfq9pmnUjpH20FmXz4wBwcPZ1va1g/Jx+uxJkTOmtytlPzYo34WOh1bc+RVp5fOsG6Ss+xvgj3Clt7PGOgiD7w0h/KJkHD2foa6c2XWr1nPnN6Iz63x79cDWFL1i7LQ8ajxR/hH0QCYVr+ky/ghEY6RNC7D/faSNOHnaiWe2apEIzxmo2LD21sreVb/j583mNIrENgReHdLI6EtyYJxeZZr4Zc+apF+MsUIMBkouOUbEj3+ra1bxeiYzf9p+KUUmyeSHgw98N7fQH9jb9EhBX01xMZ62Xly6OTQozU/QlC1J7MW2kF5qhAUUV1NMbhQIDAQABAoIBACRFGZpLo8IX38j0yv3gXcVr/0uddOlLVUrPFbQbniKHIUPBHliU/E16/pPPWPhw6babKgD0I4H5F7OW3c83bcsfU8gXZKWBaE6IvGDI5FzjkW1+hWOQDD4Z/D9234ryGOnYzvXwWviLa/Ekep0q8UetMO+enBOmL/x9D9SvTcaHCr6YaIqvWkuG0A6OsbLNpDWb/dlniq+lJKb4MqPlnjCZzLRA6z7jxxILMdq3Wz0OeJ0cPUVUjl1b4ed+62TVswK0a/CHT6Uxj82ZC20N0Ng6uZrbzukmf6kf36IQ6ZvsofG0fC4T6ZCmy7r77XGQe2B1Fc6GcMOCiO6pz+0iiMECgYEA+v/ZZE2YGVpuwO/DqyUg31kA4AdbEEMobR5Rlcuq+HlUDXJ9H79vbyscZ/ToeJrAjmdvFsXkoSf8ahc+vujD4x2/wc5CFHijgUPPPL27QwdMa3ZA3JmfsCIEEVCo3DOfU95NwcbSAT/eLJ/Mn/GBhnoTx+XUvEF1pJCxYosm868CgYEA0ihbcTEe9tCLdlbZToS0E6HizcSe24r+0bhUYyVdOiYsqOsyKh8PSSgouugigReqAHGH8fT62QbAyIoz3QgzyegmUUVtHtoNZDb8o3EkPIDEbTvshDuGidUt57DnszmN0qP1u+zWzUZDUxRkzPXYPDG5DtI/zPxrAyjLHxKVTQsCgYAohig+Fn0JEt2wzsUjm6H8DW2jvexI6t7bBzsa2UAoT8ZvSV3EQ28lXqt+aT8jQbD3DOIVpiusjT0mj8w0nHYL9CCilL98eKHFXAJYhzV1s/b1nqkINNFgaY2IkiJBMyB1NP4O3B/Jzdr8D2zFIgPMh2csLgIzxsnMoQPSqi7GxwKBgEiNOCxWmer5Sfw7tV+e/o/8hlElPPZsANaj/TYRMyMdBLP4JmRWPq+x1oXYF/lbEwx+JUGJooQECc/xrj/zUfW1WG0cO7S38IGVXhiKucjNZ4KSem+YITU6TFO9RfAgwW5jvjT3aZyKUjm/Q6FiihkVzV5phS8eQU9g6Oa8QqDLAoGBAJv3V/CvCl6xMseh59bOnZbxznqDj7Q8ucaiK4FzKPJsZzQbbGhdp6iaUcsHJTEOVs509Q2E0cifzR43ys76hgbWrEKV4H1MQ4pptt2LMc0glbpaZJNKwdmjyHEBpf+JaAJ+QIDojUp+oqPWT72VcR1+2FEM+9SLQTN5O7DbQ2ul-----END RSA PRIVATE KEY-----"

      // const data = Buffer.from("hello wordl");

      // const rsasignature = crypto.sign('RSA-SHA256', data, privateKey).toString("base64");

      // console.log("singature: " + rsasignature);

       //// testing signature using KJUR (not in pkcs1 v1.5 standard)

      // var md = new KJUR.crypto.MessageDigest({alg: "sha256", "prov": "cryptojs"});
      // md.updateString('help me');
      // var hex = md.digest();

      // console.log("digest is: " + hex);
      
       //// testing signature using node-forge
       var rsa = forge.pki.rsa;
       var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
 
       console.log("your public key: " + keypair.publicKey );
       console.log("n: " + keypair.publicKey.n);
       console.log("e: " + keypair.publicKey.e);
       console.log("your private key: " + keypair.privateKey);

 
       var md = forge.md.sha1.create();
       md.update('sign this', 'utf8');
       console.log('data to sign: ' + md);
       var signature = asciiToHex(keypair.privateKey.sign(md));
       console.log('generated signature: ' + signature);

      contractdeployed = new ethers.Contract("0x58FD3338c09FE8dB7f9A0834e283d81DdE2C3EFf", SolRsaVerify.abi, signer);
      console.log("your contract:");
      console.log(contractdeployed);

      console.log("generated signature: 0x" + sha256("hello worl!"));

      //modulus
      const n =  keypair.publicKey.n;
      //exponent
      const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001";
      const Msg = asciiToHex("hello world!");
      //signature
      const S   =  signature;

      // const n = "B812ADEE047D712021315C4F990E3717C0B752AB02163627BB857118616E2FD22E8E6E6FDE4E2790C613CF75C0F8314B287F626566ECB2CA126FECF94A2DA49164AE21F0FDC5D6EC08659A174D050CF141B210429B9F1521C82DB07CCC40E6AF773C3FF15B10FC0073E3D13891652730A134EEEAE57C24F28442E459AACAFE69";
      // const e = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001";
      // const Msg = "5cc92f8f023607777360352b0f204b22de6dea7dfce3bf3868f19e2c4bfdc145"
      // const S = ""

      let result = await verify(Msg,S,e,n,contractdeployed);
      console.log('result:');
      console.log(result)

      // const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
      // const Msg = asciiToHex("hello world")
      // const S   = "079bed733b48d69bdb03076cb17d9809072a5a765460bc72072d687dba492afe951d75b814f561f253ee5cc0f3d703b6eab5b5df635b03a5437c0a5c179309812f5b5c97650361c645bc99f806054de21eb187bc0a704ed38d3d4c2871a117c19b6da7e9a3d808481c46b22652d15b899ad3792da5419e50ee38759560002388"
      // const n  = "DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"

      // let result = verifyRaw(e,Msg,S,n, contractdeployed);
      // console.log('result:');
      // console.log(result);
    }
    else 
    {
      window.alert("Error! MetaMask is not installed, cannot connect to web3");
    }
  }

  const verify = async(_data,_s,_e,_n,contract) => {
    const sha256 = crypto.createHash('sha256').update(Buffer.from(_data, 'hex')).digest().toString('hex')
    return (await contract.pkcs1Sha256Verify("0x"+sha256,"0x"+_s,"0x"+_e,"0x"+_n)).toNumber()
 }

 const verifyRaw = async(_e,_Msg,_S,_n,contract) => {
    return (await contract.pkcs1Sha256VerifyRaw("0x"+_Msg,"0x"+_S,"0x"+_e,"0x"+_n)).toNumber();
 }  

  return (
    <div>
      <h3>Verify</h3>
      <button onClick={() => {connect()}}>click ME!</button>
    </div>
  )
}

export default RsaSigner