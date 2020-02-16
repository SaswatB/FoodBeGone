import React from 'react';
import { Link } from 'react-router-dom';

export function SupplierHome() {
    return (
        <>
            <div className='row'>
                <div className="col sm-12">
                    <Link className="waves-effect waves-teal btn" to={`/itemtemplateform`}>Item Template Form</Link>
                </div>
            </div>
            <div className='row'>
                <div className="col sm-12">
                    <Link className="waves-effect waves-teal btn" to={`/iteminformationform`}>Item Information Form</Link>
                </div>
            </div>
            <div className='row'>
                <div className="col sm-12">
                    <Link className="waves-effect waves-teal btn" to={`/scanner`}>Scan a transaction</Link>
                </div>
            </div>
        </>
    );
}
