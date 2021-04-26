import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getEquities,
  deleteEquity,
  selectAllEquities,
  selectTotalEquities,
} from "../equitiesSlice";

function EquitiesList() {
  const dispatch = useDispatch();
  const equities = useSelector(selectAllEquities);
  const status = useSelector((state) => state.equities.status);
  const error = useSelector((state) => state.equities.error);
  const count = useSelector(selectTotalEquities);

  useEffect(() => {
    if (status === "idle" || status === "saved" || status === "deleted") {
      dispatch(getEquities());
    }
  }, [status, dispatch]);

  function handleDeleteEquity(id) {
    dispatch(deleteEquity(id));
  }

  return (
    <div>
      <h1>My Equities</h1>
      <button>
        <Link to={"/add"}>Add Equity</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Price</th>
            <th>Current Price</th>
            <th>Operation Date</th>
            <th>Total: {count} equities</th>
          </tr>
        </thead>
        {status === "loading" ? (
          <tbody>
            <tr>
              <td>Loading...</td>
            </tr>
          </tbody>
        ) : status === "failed" ? (
          <tbody>
            <tr>
              <td>{error}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {equities.map((equity, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/edit/${equity.id}`}>{equity.name}</Link>
                </td>
                <td>{equity.averagePrice}</td>
                <td>{equity.currentPrice}</td>
                <td>{new Date(equity.operationDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeleteEquity(equity.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default EquitiesList;
