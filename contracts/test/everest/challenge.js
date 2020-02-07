/* Tests all challenge functionality, which is:
- funcs
    - What should it do
        - Only members can challenge
        - Members and Delegates can vote
        - Votes and vote weight work properly
        - Anyone can resolve a challenge
        - Challenges properly pass
        - Challenges properly fail
    - challenge()
    - submitVote()
    - resolveChallenge()
- getters
    - hasVotingPeriodExpired()
    - memberChallengeExists()
    - challengeCanBeResolved()
    - just make sure they work

*/

const TokenRegistry = artifacts.require('TokenRegistry.sol')
const fs = require('fs')
const config = require('../../conf/config.js')
const paramConfig = config.tokenRegistryParams
const utils = require('../utils.js')
// const BN = require('bn.js')can get from uti;s

contract('tokenRegistry', accounts => {
    const [
        tokenRegistryOwner,
        challengee,
        challengeeDelegate,
        challenger,
        challengerDelegate,
        voter
    ] = accounts
    const challengeeName = 'The Graph'
    const challengerName = 'Dave Kajpust'
    const voterName = 'Jannis Jannis'
    const voteChoice = {
        Null: 0,
        Yes: 1,
        No: 2
    }

    // describe(
    //     'Challenges. Functions tested: challenge(), submitVote(), resolveChallenge(),' +
    //         'getChallengeCount(), hasVotingPeriodExpired(), getMemberProposalVote(),' +
    //         'challengeExists(), challengeCanBeResolved()',
    //     () => {
    //         it('should allow a member to be challenged, lose, and be removed', async () => {
    //             // console.log(utils.ethersWallet(utils.walletPaths.zero))
    //             //     const tokenRegistry = await TokenRegistry.deployed()
    //             //     // Whitelist challengee
    //             //     await utils.applyAndWhitelist(
    //             //         challengeeName,
    //             //         utils.mockBytes32,
    //             //         challengee,
    //             //         challengeeDelegate
    //             //     )
    //             //     // Whitelist challenger
    //             //     await utils.applyAndWhitelist(
    //             //         challengerName,
    //             //         utils.mockBytes32,
    //             //         challenger,
    //             //         challengerDelegate
    //             //     )
    //             //     // Whitelist other voter
    //             //     await utils.applyAndWhitelist(voterName, utils.mockBytes32, voter, voter)
    //             //     // Challenge
    //             //     const receipt = await TokenRegistry.challenge(
    //             //         challengerName,
    //             //         challengeeName,
    //             //         'This is a nice challenge',
    //             //         {from: challenger}
    //             //     )
    //             //     const challengeID = receipt.logs[0].args.challengeID.toString()
    //             //     await TokenRegistry.submitVote(challengeID, voteChoice['Yes'], voterName, {from: voter})
    //             //     await utils.increaseTime(1201)
    //             //     await TokenRegistry.resolveChallenge(challengeID)
    //             //     const challengeeRemoved = await TokenRegistry.isWhitelisted(challengeeName)
    //             //     assert(!challengeeRemoved, 'Challengee was not removed from whitelisted')
    //         })

    //         it('should allow a member to be challenged, win, and stay', async () => {})

    //         it('challenge should fail when no one votes except the challenger', async () => {})
    //     }
    // )
})