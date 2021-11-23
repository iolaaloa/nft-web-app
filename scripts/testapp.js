import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState }from "react";
import { ethers } from "ethers"; 

// Constants
const TWITTER_HANDLE = 'idamannoh';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
  /*
  * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  /*
  * Gotta make sure this is async.
  */
  const checkIfWalletIsConnected = async () => {
    try {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log ("accessed user accounts:", accounts);

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    var numberOfAccounts = accounts.length;
    console.log ("Number of accounts is:",numberOfAccounts);

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
    } else {
        console.log("No authorized account found")
    }}
    catch (error) {
      console.log(error);
   }
    
  }

/*
* This runs our function when the page loads.
*/
  useEffect(() => {
  checkIfWalletIsConnected();
  }, [])
  console.log("ran useEffect")
  // Render Methods
  /*
  * We added a simple onClick event here.
  */
  const renderNotConnectedContainer = () => (
    <button onClick={checkIfWalletIsConnected} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );
  /*
  * We want the "Connect to Wallet" button to dissapear if they've already connected their wallet!
  */
  const renderMintUI = () => (
    <button onClick={null} className="cta-button connect-wallet-button">
      Mint NFT
    </button>
  )
  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already conencted :).
  */

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text"> 🌿 Herb 🌿</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your Herb NFT today.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
