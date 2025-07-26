// src/main.js
import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { launchTokenAfterPayment } from './create-token-handler.js';

let provider = null;
let connectedWallet = null;

window.addEventListener("load", async () => {
  if (window.solana?.isPhantom) {
    provider = window.solana;
    try {
      const res = await provider.connect({ onlyIfTrusted: true });
      connectedWallet = res.publicKey;
      document.getElementById("walletAddress").textContent =
        `Wallet: ${connectedWallet.toString()}`;
    } catch (e) {
      console.log("Phantom non autorizzato ancora.");
    }
  } else {
    alert("Phantom Wallet non è installato.");
  }
});

async function connectWallet() {
  if (!window.solana?.isPhantom) {
    alert("Installa Phantom Wallet per continuare.");
    return;
  }

  try {
    const res = await window.solana.connect({ onlyIfTrusted: false });
    connectedWallet = res.publicKey;
    document.getElementById("walletAddress").textContent =
      `Wallet: ${connectedWallet.toString()}`;
    console.log("✅ Wallet connesso:", connectedWallet.toString());
  } catch (err) {
    console.error("❌ Connessione fallita:", err);
    alert("Connessione fallita o annullata.");
  }
}

document.getElementById("connectWalletBtn")
  .addEventListener("click", connectWallet);

document.getElementById("launchTokenBtn")
  .addEventListener("click", async () => {
    if (!connectedWallet) {
      alert("Connetti il wallet prima di creare il token.");
      return;
    }
    try {
      await launchTokenAfterPayment(provider);
    } catch (err) {
      console.error("Errore nella creazione del token:", err);
      alert("Errore nella creazione del token. Guarda la console.");
    }
  });
