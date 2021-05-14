import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initOrderBook,
  updateBook,
  setPrecision,
  selectPrecision,
  selectBuyOrderBook,
  selectSellOrderBook
} from './orderBookSlice';
import styles from './OrderBook.module.css';
import { createWebSocket } from './socket';

export function OrderBook() {
  const currentPrecision = useSelector(selectPrecision);
  const buyBook = useSelector(selectBuyOrderBook);
  const sellBook = useSelector(selectSellOrderBook);
  const iterateArray = Array.from(Array((buyBook.length > sellBook.length) ?
    buyBook.length : sellBook.length).keys());
  const dispatch = useDispatch();
  useEffect(() => {
    const createSocket = () => {
      // I would integrate it with middleware of Redux, but had not time for it
      const wss = createWebSocket();
      let dataCount = 0;
      wss.onmessage = (msg) => {
        const msgData = JSON.parse(msg.data);
        if (!msgData.event && Array.isArray(msgData[msgData.length - 1])) {
          if (!dataCount) {
            dispatch(initOrderBook(msgData));
            dataCount++;
          } else {
            dispatch(updateBook(msgData[msgData.length - 1]));
          }
        }
      }
      wss.onclose = () => {
        setTimeout(() => createSocket(), 500);
      }
    }
    createSocket(currentPrecision);
  }, [dispatch, currentPrecision]);

  return (
    <div>
      <div>Current precision: {currentPrecision}</div>
      <button onClick={() => dispatch(setPrecision(currentPrecision === 'normal' ? 'precise' : 'normal'))}>
        toggle precision
      </button>
      {!!buyBook.length && !!sellBook.length && <table>
        <tr>
          <th colSpan="3">Buy</th>
          <th colSpan="3">Sell</th>
        </tr>
        {iterateArray.map((val, key) => <tr>
          {buyBook[key] ? <>
            <td className={styles.buy}>{buyBook[key][0]}</td>
            <td className={styles.buy}>{buyBook[key][1]}</td>
            <td className={styles.buy}>{buyBook[key][2]}</td>
          </> : <>
            <td />
            <td />
            <td />
          </>}
          {sellBook[key] ? <>
            <td className={styles.sell}>{sellBook[key][0]}</td>
            <td className={styles.sell}>{sellBook[key][1]}</td>
            <td className={styles.sell}>{Math.abs(sellBook[key][2])}</td>
          </> : <>
            <td/>
            <td/>
            <td/>
          </>}
        </tr>)}
      </table>}
    </div>
  );
}
