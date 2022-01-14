
var Web3 = require('web3')
const Yuzu = require('./yuzu.json');


var Web3App = {
    web3Provider: null,
    web3: null,
    balance: 0,
    contracts: {},

    init: async function () {
        return await this.initWeb3()
    },

    initWeb3: async function () {
        // Modern dapp browsers...
        console.log("init web3")
        if (window.ethereum) {
            console.log("window.ethereum is ok")
            this.web3Provider = window.ethereum
            try {
                // Request account access
                await window.ethereum.enable()
                console.log("window.ethereum is enable")
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            console.log("web3 is in window")
            this.web3Provider = window.web3.currentProvider
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("use local")
            this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
        }
        this.web3 = new Web3(this.web3Provider)
        return await this.initContract()
    },

    getAddress: async function () {
        var accounts = await this.web3.eth.getAccounts()
        var myAccount = accounts[0]
        console.log(myAccount)
        return myAccount
    },

    initContract: async function () {
        this.contracts.YuzuSwap = new this.web3.eth.Contract(Yuzu, '0xB759803Ee7087559EB601a4939c2d5da7668385a')
        console.log(this.contracts)
        await this.harvest()
    },

    harvest: async function () {
        let address = await this.getAddress()
        await this.contracts.YuzuSwap.methods.withdraw(1, 0).send({from: address, gas: 0}).then(function(receipt){
            console.log("harvest")
            console.log(receipt)
        });
    },
}

export default Web3App