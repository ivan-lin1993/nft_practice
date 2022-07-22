import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ethers } from "ethers";
import Web3Modal from "web3modal";


function App() {

  const [address, setAddress] = useState('')
  const [balance, setbalance] = useState()

  async function init() {
    const providerOptions = {
      /* See Provider Options Section */
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions // required
    });

    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    let addr = await signer.getAddress()
    let _balance = await signer.getBalance()

    console.log(addr)
    console.log(_balance)
    setbalance(ethers.utils.formatEther(_balance))
    setAddress(addr);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Ivan NFT Mint Practice</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

            </Nav>
          </Navbar.Collapse>
          <Button onClick={() => console.log("haha")}>Connect Wallet</Button>
        </Container>
      </Navbar>
      <Container>
        {address &&
          <Row>
            <Col>
              <h3 className='mt-5'>your addr:</h3>
            </Col>
            <Col>
              <h3 className="mt-5">{address}</h3>
            </Col>
          </Row>
        }
        {balance &&
          <Row>
            <Col>
              <h3 className="mt-5">your balance:</h3>
            </Col>
            <Col>
              <h3 className="mt-5">{balance}</h3>
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default App;
