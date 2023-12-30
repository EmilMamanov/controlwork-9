import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Category } from '../../types';
import { setCategories, setFetchLoading } from './categoriesSlice';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setFetchLoading(true));
        const response = await axiosApi.get('/categories.json');

        const categories: Record<string, Category> = {};

        for (const [key, value] of Object.entries(response.data)) {
            categories[key] = value as Category;
        }

        thunkAPI.dispatch(setCategories(categories));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    } finally {
        thunkAPI.dispatch(setFetchLoading(false));
    }
});
