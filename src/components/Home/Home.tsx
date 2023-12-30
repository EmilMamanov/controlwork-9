import React from 'react';
import TransactionList from "../TransactionList/TransactionList.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <h2>Home Page</h2>
            <TransactionList/>
        </div>
    );
};

export default Home;