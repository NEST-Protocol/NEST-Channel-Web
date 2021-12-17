export const useChannelList = () => {
  const channelList = [
    {
      channelId: 0, token0: "0xbe155cdf7f6da37684a36dcc02076ed314d5467a", unit: "1",
      token1: "0xc9f51064022a011152b7da6dde44def02b5c157c", reward: "0xc9f51064022a011152b7da6dde44def02b5c157c"
    },
    {
      channelId: 1, token0: "0x7f037a1df6f62b46ede765c535187ecceef5d455", unit: "1000000000000000000000",
      token1: "0xc9f51064022a011152b7da6dde44def02b5c157c", reward: "0xc9f51064022a011152b7da6dde44def02b5c157c"
    },
  ]

  return channelList
}

export default useChannelList