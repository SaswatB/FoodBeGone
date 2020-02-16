import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import QRCode from "qrcode.react";
import axios from "axios";
import { SERVER } from "../../constants";
import "./Confirmation.css"

export function Confirmation() {
    const { transaction_id } = useParams();
    const [transaction, setTransaction] = useState();
    // get transaction from the api
    useEffect(() => {
      const call = async () => setTransaction((await axios.get(`http://${SERVER}/users/0/transactions/${transaction_id}`)).data);
      call();
    }, [transaction_id])

    return (<div className="confirmation">
        {
            !transaction
                ? <div className="confirmation-message">Loading...</div>
                : (
                    <>
                        <QRCode className="confirmation-qr" value={transaction.token} size={256} />
                        Item: {transaction.item.item_template.name} <br />
                        Count: {transaction.item.count_left}/{transaction.item.count} <br />
                        Amount: ${(transaction.amount/100).toFixed(2)} <br />
                        Purchase Date: {moment(transaction.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")} <br/>
                        Seller: {transaction.item.item_template.user.user_name} <br/>
                        Seller Address: {transaction.item.item_template.user.address} <br/>
                    </>
                )
        }
    </div>);
}
