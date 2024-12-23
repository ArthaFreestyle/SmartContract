const HDwalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const SeedPhrase = require('./env');


const provider = new HDwalletProvider(
    SeedPhrase,
    'https://sepolia.infura.io/v3/af2b0a1b7c824ab0899f2a83a15c206b'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[1]);

    const result = await new web3.eth.Contract(abi)
        .deploy(
            {
                data: evm.bytecode.object,
                arguments: ['Hi there!']
            }
        ).send({ from: accounts[1], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};

deploy();