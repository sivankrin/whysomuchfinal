import React from 'react';

const CostsTable = ({ costs }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {costs.length > 0 ? (
                costs.map((cost, index) => (
                    <tr key={index}>
                        <td>{cost.date}</td>
                        <td>{cost.category}</td>
                        <td>{cost.description}</td>
                        <td>{cost.sum|| 'N/A'}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="3">No costs recorded</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default CostsTable;
