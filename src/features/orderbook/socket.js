export const createWebSocket = (currentPrecision) => {
  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
  wss.onopen = () => {
    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      pair: 'tBTCUSD',
      freq: 'F1',
      len: '25',
      prec: currentPrecision === 'normal' ? 'P0' : 'P4'
    });
    wss.send(msg);
  }
  return wss;
};
