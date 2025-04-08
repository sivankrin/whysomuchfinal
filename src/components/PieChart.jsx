// PieChart.jsx
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const PieChart = ({ costs }) => {
    // Reference to the canvas element for the chart
    const chartRef = useRef(null);
    // Reference to store the Chart instance for proper cleanup
    const chartInstance = useRef(null);

    useEffect(() => {
        // If a previous chart instance exists, destroy it to avoid duplication
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Aggregate expenses by category
        const categoryData = costs.reduce((acc, cost) => {
            // Sum up the amounts for each category
            acc[cost.category] = (acc[cost.category] || 0) + parseFloat(cost.sum);
            return acc;
        }, {});

        const ctx = chartRef.current.getContext("2d");

        // Create a new pie chart instance
        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(categoryData),
                datasets: [
                    {
                        data: Object.values(categoryData),
                        backgroundColor: [
                            "#FF9999",
                            "#66B3FF",
                            "#99FF99",
                            "#FFCC99",
                            "#FFD700",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        // Cleanup function to destroy the chart when the component unmounts or updates
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [costs]);

    return <canvas ref={chartRef} width="250" height="250"></canvas>;
};

export default PieChart;
