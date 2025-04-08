// MonthlyReport.jsx
import React, { useState, useEffect } from "react";
import IndexedDBWrapper from "../idb";
// Importing the PieChart component to display monthly expenses in a pie chart
import PieChart from "./PieChart";

const MonthlyReport = () => {
    // State to hold the filtered report for the selected month/year
    const [report, setReport] = useState([]);
    // State for selected month (default is current month)
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    // State for selected year (default is current year)
    const [year, setYear] = useState(new Date().getFullYear());

    // Function to fetch all expenses from IndexedDB and filter by selected month and year
    const fetchReport = async () => {
        try {
            const db = new IndexedDBWrapper("costManagerDB", 1);
            await db.init();
            const allCosts = await db.getAllItems("costs");

            // Filter costs based on the selected month and year
            const filteredCosts = allCosts.filter((cost) => {
                const date = new Date(cost.date);
                return (
                    date.getMonth() + 1 === Number(month) &&
                    date.getFullYear() === Number(year)
                );
            });

            // Update the report state with the filtered monthly expenses
            setReport(filteredCosts);
        } catch (error) {
            console.error("Error fetching monthly report:", error);
        }
    };

    // Re-fetch data when the selected month or year changes
    useEffect(() => {
        fetchReport();
    }, [month, year]);

    return (
        <div>
            <h2>Monthly Report</h2>

            {/* Month selection */}
            <label>Month: </label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                ))}
            </select>

            {/* Year selection */}
            <br />
            <label>Year: </label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
                {[...Array(5)].map((_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                    </option>
                ))}
            </select>

            {/* PieChart component that displays the monthly expenses */}
            <div style={{ width: "300px", height: "300px", margin: "20px auto" }}>
                <PieChart costs={report} />
            </div>

            {/* Monthly expenses table */}
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount (₪)</th>
                </tr>
                </thead>
                <tbody>
                {report.length > 0 ? (
                    report.map((cost, index) => (
                        <tr key={index}>
                            <td>{new Date(cost.date).toLocaleDateString()}</td>
                            <td>{cost.category}</td>
                            <td>{cost.description}</td>
                            <td>{cost.sum} ₪</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No data available for this month.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyReport;
