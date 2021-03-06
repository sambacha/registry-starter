import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'

import resolvers from '..'
import { getFromIpfs, TokenMetadata, ipfsClient, createApolloClient } from './utils'

describe('Mutation Resolvers', () => {
  const observer = new BehaviorSubject<any>({} as any)

  const client = createApolloClient(
    resolvers.resolvers,
    resolvers.config,
    resolvers.stateBuilder,
  )

  let publishedValue: any

  beforeAll(() => {
    observer.subscribe(value => {
      if (value) {
        publishedValue = value
      }
    })
  })

  describe('addToken resolver', () => {
    it('Should upload image to IPFS and then metadata', async () => {
      let metadata: TokenMetadata, image: string

      await client.mutate({
        mutation: gql`
          mutation addToken($options: TokenOptions) {
            addToken(options: $options) @client {
              metadataHash
            }
          }
        `,
        variables: {
          options: {
            symbol: 'test sym',
            description: 'test description',
            image: 'test img',
            decimals: 'test decimals',
          },
        },
        context: {
          _rootSub: observer,
        },
      })

      const metadataString = await getFromIpfs(
        ipfsClient,
        publishedValue.addToken.metadataHash,
      )

      metadata = JSON.parse(metadataString)
      image = await getFromIpfs(ipfsClient, metadata.image)

      expect(metadata.symbol).toEqual('test sym')
      expect(image).toEqual('test img')
    })
  })

  describe('deleteToken resolver', () => {
    it('Should return true', async () => {
      const {
        data: { deleteToken },
      } = await client.mutate({
        mutation: gql`
          mutation deleteToken($tokenId: TokenOptions) {
            deleteToken(tokenId: $tokenId) @client
          }
        `,
        variables: {
          tokenId: 'RandomID',
        },
        context: {
          _rootSub: observer,
        },
      })

      expect(deleteToken).toEqual(true)
    })
  })

  describe('challengeToken resolver', () => {
    it('Should upload challenge data to IPFS', async () => {
      await client.mutate({
        mutation: gql`
          mutation challengeToken($options: ChallengeOptions!) {
            challengeToken(options: $options) @client
          }
        `,
        variables: {
          options: {
            description: 'test desc',
            token: {
              symbol: 'test sym',
              description: 'test description',
              image: 'test img',
              decimals: 'test decimals',
            },
          },
        },
        context: {
          _rootSub: observer,
        },
      })

      const challengeString = await getFromIpfs(
        ipfsClient,
        publishedValue.challengeToken.challengeHash,
      )

      const challengeData = JSON.parse(challengeString)

      expect(challengeData.description).toEqual('test desc')
      expect(challengeData.token.symbol).toEqual('test sym')
    })
  })
})
