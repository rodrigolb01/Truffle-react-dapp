import { useState } from 'react';

const Web3  = require('web3');
const web3  = new Web3();

const Signer = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [message, setMessage] = useState('');

    const sign = async() => {
        var data_to_sign = "Hello world!";
        console.log('signing with key: ' + privateKey);
        var signature    =  web3.eth.accounts.sign(data_to_sign, privateKey);
        console.log("Invoke Verifier.verify() with the following arguments:")
        console.log("messageHash: " + signature["messageHash"]);
        console.log("v          : " + signature["v"]);
        console.log("r          : " + signature["r"]);
        console.log("s          : " + signature["s"]);
    }

    return (
        <div>
            <div>
                <h3>Sign a message: </h3>
                <input type="text" placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                <input type="text" placeholder='private key' value={privateKey} onChange={(e) => setPrivateKey(e.target.value)}></input>
                <button onClick={sign}>Sign</button>
            </div>
        </div>
        
    )
}

export default Signer
