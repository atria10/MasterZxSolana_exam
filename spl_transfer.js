const { Keypair, Connection, PublicKey } = require("@solana/web3.js");

const {
  getOrCreateAssociatedTokenAccount,
  transfer,
} = require("@solana/spl-token");

const wallet = require("./test.json");
const mintAddress = require("./mintAddress.json").address; // link to mint Address
const ata = require("./mintAddress.json").ata; // link to associated token address

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey(mintAddress);
const fromAta = new PublicKey(ata);

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to.publicKey
  );

  const toAta = tokenAccount.address;
  console.log("Associated Token Account: ", toAta.toBase58());

  const amountToAta = tokenAccount.amount;
  console.log("Amount in ATA: ", amountToAta.toString());

  const amount = 10e5;

  await transfer(connection, keypair, fromAta, toAta, keypair, amount);

  console.log(
    "Transferred",
    amount,
    "from",
    fromAta.toBase58(),
    "to",
    toAta.toBase58()
  );
})();

// To:  9eJdHBBGjvRRiwndyGRKWWeVjvCHWmYpwcQH4t7k963t
// Associated Token Account:  1RdQZByqMPQj6sCP8ZaYZZpjcgnZmGyxSrnuYghjt3G
// Amount in ATA:  0
// Transferred 1000000 from ______ to ___
