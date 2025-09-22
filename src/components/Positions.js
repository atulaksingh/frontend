import React,{useState,useEffect} from "react";
import axios from "axios";
const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/allPositions")
    .then((res) => {
      // console.log(res.data);
      setPositions(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {positions.map((stock, index) => {
           const carValue = stock.price * stock.qty;
           const isProfit = carValue - stock.avg*stock.qty >= 0.0;
           const profClass = isProfit ? "profit" : "loss";
           const dayLoss = stock.isLoss ? "loss" : "profit";
return (
            <tr key={index} >
              <td>{stock.product}</td>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.avg.toFixed(2)}</td>
              <td>{stock.price.toFixed(2)}</td>
              <td className={profClass}>{isProfit ? "+" : "-"}{Math.abs(carValue - stock.avg*stock.qty).toFixed(2)} </td>
              <td className={dayLoss}>{isProfit ? "+" : "-"}{Math.abs(((stock.price - stock.avg)/stock.avg)*100).toFixed(2)}%</td>
            </tr>
           );

           } )}
        </table>
      </div>
    </>
  );
};

export default Positions;
