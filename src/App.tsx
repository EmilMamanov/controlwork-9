import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import AddTransaction from './components/AddTransaction/AddTransaction';
import TransactionList from './components/TransactionList/TransactionList';

const App: React.FC = () => {
    return (

        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="categories" element={<Categories />} />
                <Route path="add" element={<AddTransaction />} />
                <Route path="transactions" element={<TransactionList />} />
                <Route path="*" element={<h1>Not Found!</h1>} />
            </Routes>
        </Layout>
    );
};

export default App;
