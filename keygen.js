const { Keypair } = require("@solana/web3.js");

const keypair = Keypair.generate();

console.log("private key: ", keypair.secretKey);
