import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { SERVER } from "../../constants";
import "./Transaction.css"

export function Transactions() {
    const [transactions, setTransactions] = useState();
    // todo api call
    useEffect(() => {
        const call = async () => {
            const axios = require('axios');
            const value = await axios.get(`http://${SERVER}/users/4f43acf0-5df7-45c7-b759-6d42cacf6f2a/transactions`)
                .then(function (response) {
                    // handle success
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
                        txs.push(t);
                        index++;
                    }

                    txs.sort((a, b) => {
                        const a_moment = moment(a.timestamp)
                        const b_moment = moment(b.timestamp)
                        if (a_moment.isAfter(b_moment)) {
                            return -1;
                        } else if (a_moment.isBefore(b_moment)) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
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
