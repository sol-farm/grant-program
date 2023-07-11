## Getting started

### 1. Setup the env variables

Setup the env variables by copying the `.env.sample` file to `.env` file and change the endpoint to the relevant endpoints for testing, for example:

- `devnet` for devnet
- `http://localhost:8899` for local testing

Note: When doing local testing, please remember to replace `LOCALNET_PYTH_MINT` to the address generated by running `yarn setup` in the third step.

### 2. Start the test validator:

```bash
cd staking
sh build_wasm.sh
yarn install
yarn start
```

### 3. Setup the relevant accounts

Once the Idl account has been created, keep the process running, open a new terminal process in the same directory and run the setup script to create pyth token, as well as create a couple of keypairs to receive SOL, receive PYTH token, create stake accounts, deposit and lock tokens:

```bash
yarn setup
```

Once that's done, change directory to the frontend directory and run:

```bash
npm install
npm run dev
```