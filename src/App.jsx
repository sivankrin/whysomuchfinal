import React, { useState, useEffect } from 'react';
import AddCostForm from './components/AddCostForm';
import CostsTable from './components/CostsTable';
import IndexedDBWrapper from './idb';
import MonthlyReport from './components/MonthlyReport';
import './App.css';

const App = () => {
    const [costs, setCosts] = useState([]);
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initDB = async () => {
            try {
                const idb = new IndexedDBWrapper('costManagerDB', 1);
                await idb.init();
                setDb(idb);
                const storedCosts = await idb.getAllItems('costs');
                setCosts(storedCosts);
            } catch (error) {
                console.error('Error initializing database:', error);
            }
        };
        initDB();
    }, []);

    const handleAddCost = async (newCost) => {
        if (db) {
            try {
                await db.addItem('costs', newCost);
                const allCosts = await db.getAllItems('costs');
                setCosts(allCosts);
            } catch (error) {
                console.error('Error adding cost:', error);
            }
        }
    };

    return (
        <div className="main-layout">
            {/* עמודה שמאלית – הוספת פריט */}
            <div className="left-column">
                <h1>Cost Manager</h1>
                <AddCostForm onAddCost={handleAddCost}/>
            </div>

            {/* עמודה מרכזית – טבלת ההוצאות */}
            <div className="center-column">
                <div className="table-container">
                    <CostsTable costs={costs}/>
                </div>
            </div>

            {/* עמודה ימנית – דוח חודשי כולל גרף עוגה */}
            <div className="right-column">
                <MonthlyReport costs={costs} />  {/* דוח חודשי עם גרף עוגה */}
            </div>
        </div>
    );
};

export default App;
