import React, { useState } from "react";
import {
    Card,
    CardTitle,
    CardText,
    Button,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    ListGroup,
} from "reactstrap";
import MetaDataRow from "../../components/MetadataRow";
import { useSelector, useDispatch } from 'react-redux';
import { getImageUrl } from "../../redux/actions/imageUrlActions";
import "./Home.css";
import { create } from "ipfs-http-client";
import { pinJSONToIPFS } from "../../pinata/Pinata";
import { connectWallet } from '../../web3'
import * as constants from '../../constants/constants'
export let list = []
const client = create("https://ipfs.infura.io:5001/api/v0");

const Home = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [address, setAddress] = useState("")
    const [isHidden, setIsHidden] = useState(true)

    const changeName = (e) => {
        const name = e.target.value
        setName(name)
    }
    const changePrice = (e) => {
        const price = e.target.value
        setPrice(price)
    }
    const activateWallet = async () => {
        const walletResponse = await connectWallet();
        setAddress(walletResponse.address)
        setIsHidden(false)
    }
    const changeImage = async (e) => {
        const file = e.target.files[0];
        try {
            const ipfs = await client.add(file);
            console.log(ipfs)
            const url = `https://ipfs.infura.io/ipfs/${ipfs.path}`;
            setFileUrl(url);
            dispatch(getImageUrl(url))
        } catch (e) {
            console.log(e);
        }
    }
    const mint = () => {
        if (name == "" || fileUrl == "" || price == "" || state.list == []) {
            alert("Fill each field properly.")
        } else {
            const metaData = [{ name: name, url: fileUrl, traitList: state.list, price: price }]
            pinJSONToIPFS(state.imageUrl, address, metaData).then(
            )
        }
    }
    return (
        <>
            <div className="container">
                <Row >
                    <Col>
                        <Button onClick={() => activateWallet()} id="mintNftButton" color="primary" >
                            {address == "" ? "Connect" : "Connected"}
                        </Button>
                    </Col>
                    <Col sm="12">
                        <Card body>
                            <CardTitle tag="h3">{constants.GENERAL_INFO}</CardTitle>
                            <br />
                            <CardTitle tag="h5">{constants.ADDRESS}: {address}</CardTitle>
                            <CardText>
                                <Row hidden={isHidden}>
                                    <Col sm="9">
                                        <FormGroup>
                                            <Label for="nameNft">{constants.NAME}:</Label>
                                            <Input
                                                id="nameNft"
                                                placeholder="Enter an nft name"
                                                type="text"
                                                onChange={changeName}
                                            />
                                            <br />
                                            <Label for="fileNft">{constants.YOUR_IMAGE}:</Label>
                                            <Input
                                                id="fileNft"
                                                onChange={changeImage}
                                                type="file"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="2">
                                        <img style={{ marginLeft: "15px" }} width="150px" alt="" src={fileUrl == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/1200px-Blue_question_mark_icon.svg.png" : fileUrl} />
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row hidden={isHidden}>
                    <Col sm="12">
                        <Card body>
                            <CardTitle tag="h5">{constants.METADATA}</CardTitle>
                            <br />
                            <CardText>
                                <ListGroup>
                                    <MetaDataRow />
                                    <MetaDataRow />
                                    <MetaDataRow />
                                </ListGroup>
                                <Col>
                                </Col>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row hidden={isHidden}>
                    <Col sm="12">
                        <Card body>
                            <CardTitle tag="h5">{constants.PRICE}</CardTitle>
                            <br />
                            <CardText>
                                <Row>
                                    <Col sm="12">
                                        <FormGroup>
                                            <Input
                                                type="number"
                                                onChange={changePrice}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Button hidden={isHidden} onClick={() => mint()} id="mintNftButton" color="primary" >
                    {constants.MINT}
                </Button>
            </div>
        </>
    );
};

export default Home;