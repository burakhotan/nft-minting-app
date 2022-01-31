import Web3 from "web3";
import { ipfsHash } from "./pinata/Pinata";
import { abi, contractAddress } from './contract/erc721Contract'
import SweetAlert from "sweetalert2";
let web3;

web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

let address = null;
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                address: addressArray[0],
            };
            address = addressArray[0];
            return obj;
        } catch (err) {
            alert('Can not connect to wallet')
            return {
                address: "",
            };
        }
    } else {
        alert('Try Again')
        return {
            address: "",
        };
    }
};

export const mintNFT = async (imageUrl, address) => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
        await contract.methods
            .createToken(ipfsHash)
            .send({
                from: address
            }).then((response) => {
                SweetAlert.fire({
                    icon: "success",
                    text: "Successfully Minted",
                    footer: `<a href="https://rinkeby.etherscan.io//tx/${response.transactionHash}" target="_blank">Check Tx Status</a>&emsp;<a href="${imageUrl}" target="_blank">Inspect Image</a>`,
                });
            });
    } catch (e) {
        alert('Transaction has been canceled.')
    }
};

