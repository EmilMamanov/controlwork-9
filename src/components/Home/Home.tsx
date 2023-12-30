import React from 'react';
import TotalBalance from "../TotalBalance/TotalBalance.tsx";
import TransactionList from "../TransactionList/TransactionList.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <h2>Home Page</h2>
            <TotalBalance/>
            <TransactionList/>
        </div>
    );
};

export default Home;