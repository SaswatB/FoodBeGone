import React, { useState, useEffect } from "react";
import moment from "moment";
import QRCode from "qrcode.react";
import "./Confirmation.css"

export function Confirmation() {
    const [transaction, setTransaction] = useState(
        {
            id: 0,
            timestamp: "2020-02-16T05:14:34.960Z",
            amount: 1299,
            token: "26b4bc7b70d0feb4018a171cc3d3e4fe1c38671e5170ac2dc6d72642344c",
            item: {
                count: 2,
                template: {
                    name: 'Tomato',
                    seller: {
                        name: "San Francisco Museum of Modern Art",
                        address: "151 3rd St, San Francisco, CA 94103",
                    }
                }
            }
        }
    );
    // todo api call
    useEffect(() => {
        const call = async () => {
            const value = await axios...
            setTransaction(value);
        };
        call();
    }, [])

    return (<div className="confirmation">
        {
            !transaction
                ? <div className="confirmation-message">Loading...</div>
                : (
                    <>
                        <QRCode className="confirmation-qr" value={transaction.token} size={256} />
                        Item: {transaction.item.template.name} <br />
                        Count: {transaction.item.count} <br />
                        Amount: ${(transaction.amount/100).toFixed(2)} <br />
                        Purchase Date: {moment(transaction.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")} <br/>
                        Seller: {transaction.item.template.seller.name} <br/>
                        Seller Address: {transaction.item.template.seller.address} <br/>
                    </>
                )
        }
    </div>);
}
