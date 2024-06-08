const { Keypair, Connection } = require("@solana/web3.js");

const { createMint } = require("@solana/spl-token");

const wallet = require("./test.json");

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  const mint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    10
  );

  console.log("Mint Address:", mint.toBase58());
})();
