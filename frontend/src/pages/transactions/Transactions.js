import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Transaction.css"

export function Transactions() {
    const [transactions, setTransactions] = useState([
        {
            id: 0,
            timestamp: "2020-02-16T05:14:34.960Z",
            amount: 1299,
            token: "26b4bc7b70d0feb4018a171cc3d3e4fe1c38671e5170ac2dc6d72642344c",
            item: { count: 2, template: {name: 'Tomato'} }
        }
    ]);
    // todo api call

    return (<div className="transaction-list">
        {
            !transactions
                ? <div className="transaction-list-message">Loading...</div>
                : !transactions.length
                ? <div className="transaction-list-message">No Transactions Available</div>
                : (
                    transactions.map((transaction) => (
                        <Link className="transaction-list-item" key={transaction.id}  to={`/confirmation/${transaction.id}`}>
                            {moment(transaction.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")} <br/>
                            Item: {transaction.item.template.name} <br />
                            Amount: ${(transaction.amount/100).toFixed(2)}
                        </Link>
                    ))
                )
        }
    </div>);
}
