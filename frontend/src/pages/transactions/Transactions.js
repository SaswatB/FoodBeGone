import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { SERVER } from "../../constants";
import "./Transaction.css"

export function Transactions() {
    const [transactions, setTransactions] = useState([
        {
            id: "e1ab77c5-1b59-473b-a827-c92ff1747a21",
            timestamp: "2020-02-16T05:14:34.960Z",
            amount: 1299,
            token: "26b4bc7b70d0feb4018a171cc3d3e4fe1c38671e5170ac2dc6d72642344c",
            item: { count: 2, template: {name: 'Tomato'} }
        }
    ]);
    // todo api call
    useEffect(() => {
        const call = async () => {
            const axios = require('axios');
            const value = await axios.get(`http://${SERVER}/users/4f43acf0-5df7-45c7-b759-6d42cacf6f2a/transactions`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    const transactions = response.data
                    var index = 0;
                    var txs = [];
                    while (index < transactions.length) {
                        const transaction = transactions[index];
                        const t = {
                            id: transaction.id,
                            timestamp: transaction.timestamp,
                            amount: transaction.amount,
                            token: transaction.token,
                            // TODO: Count is hard-coded,
                            item: {count: transaction.purchased_count, template: {name: transaction.item.item_template.name}}
                        }
                        console.log(t);
                        txs.push(t);
                        index++;
                    }
                    setTransactions(txs);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        };
        call();
    }, [])
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
