import React, { useState } from 'react';

export default function AddCostForm({ onAddCost }) {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Food');
    const [description, setDescription] = useState('');
    const [sum, setSum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCost = { date, category, description, sum };
        onAddCost(newCost);
        setDate('');
        setCategory('Food');
        setDescription('');
        setSum('');
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* תאריך */}
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label><br />

            {/* קטגוריה */}
            <label>
                Category:
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Loans">Loans</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Other">Other</option>
                </select>
            </label><br />

            {/* תיאור */}
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label><br />

            {/* סכום */}
            <label>
                Amount:
                <input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    required
                />
            </label><br />

            <button type="submit">Add Cost</button>
        </form>
    );
}
