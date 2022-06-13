import { useState, useEffect } from 'react';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from 'ethers';
import './App.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function App(){

  const [greeting,doGreeting] = useState(null);
  const [contract,setContract] = useState(null);
  const [provider,setProvider] = useState(null);


  useEffect(()=>{
    const loadProvider = async ()=>{
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract( 
        contractAddress,
        Greeter.abi,
        provider 
        );
      setContract(contract);
      setProvider(provider);
    };
    loadProvider();
  },[]);
  useEffect(()=>{
    const getGreetings = async() => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  },[contract]);

  const changeGreetings = async ()=>{
    const input = document.querySelector("#value");
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function(){
      window.location.reload(1);
    },500);
    setTimeout();
  };
  return (
    
    <div className='body'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Hardhat Dapp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </Navbar>
    <div className="center">
     <h3>{greeting}</h3>
     <input className="input" type="text" id="value"></input>
     <button className="button" onClick={changeGreetings}>
      change
     </button>

    </div>
    </div>
  );
};

export default App;
