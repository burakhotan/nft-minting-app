import axios from "axios";
import { mintNFT } from "../web3.js";
require('dotenv').config();
//.env or backend
const api_key = "8715e222b07d9b2422e0"
const secret_key = "88e967ba430ec519c0d216db8bccf9b46b4e3c2b7afeb0eae27e0dac40619f0b"

export let ipfsHash = null

export const pinJSONToIPFS = async (imageUrl, address, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
        await axios
            .post(url, JSONBody, {
                headers: {
                    pinata_api_key: api_key,
                    pinata_secret_api_key: secret_key
                }
            }).then((response) => {
                ipfsHash = response.data["IpfsHash"]
                mintNFT(imageUrl, address)
            });
    } catch (e) {
        console.log(e)
    }
}
