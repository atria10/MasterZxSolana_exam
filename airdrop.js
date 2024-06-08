const { Keypair, Connection, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const  wallet= require("./test.json");

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com", "finalized");

// airdropping 3 Sol
(async () => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      3 * LAMPORTS_PER_SOL
    );

    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`
    );
  } catch (error) {
    console.error(error);
  }
})();
