import { useState } from 'react';

const Web3  = require('web3');
const web3  = new Web3();

const Signer = () => {
    const sign = () => {
        var account = web3.eth.accounts.create();

        var data_to_sign = "Hello world!";
        var signature    =  web3.eth.accounts.sign(data_to_sign, account['privateKey']);
        console.log("Invoke Verifier.verify() with the following arguments:")
        console.log("messageHash: " + signature["messageHash"]);
        console.log("v          : " + signature["v"]);
        console.log("r          : " + signature["r"]);
        console.log("s          : " + signature["s"]);
        console.log("signer     : " + account["address"]);
    }

    return (
        <div>
            <div>
            <h3>Sign a message: </h3>
            <input id="message" type="text"></input>
            <button onClick={sign}>Sign</button>
            </div>
            <div>
                <h3>Your signature is: </h3>
                <h2 id="signature"></h2>
            </div>
            <div>
                <h3>Verify Message</h3>
                <input id="verify-message" type="text"></input>
                <h3>Verify signature</h3>
                <input id="verify-signature" type="text"></input>
                <button>Verify</button>
            </div>
            <div>
                <h3>Valid signature:</h3>
                <h2 id="validation-result"></h2>
            </div>
        </div>
        
    )
}

export default Signer
