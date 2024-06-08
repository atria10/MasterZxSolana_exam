const {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const {
  mintTo,
  getOrCreateAssociatedTokenAccount,
} = require("@solana/spl-token");

const wallet = require("./test.json");
const mintAddress = require("./mintAddress.json").address; // link to mint Address

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey(mintAddress);

(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  const ata = tokenAccount.address;
  console.log("Associated Token Account: ", ata.toBase58());

  const amount = 2*LAMPORTS_PER_SOL;

  await mintTo(connection, keypair, mint, ata, keypair.publicKey, amount);

  console.log("Minted", amount, "to", ata.toBase58());
})();
