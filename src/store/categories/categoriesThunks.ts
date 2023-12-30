import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Category, AddCategoryForm } from '../../types';
import { setCategories, setFetchLoading } from './categoriesSlice';
import { AppDispatch } from '../../app/store.ts'

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

export const addCategory = createAsyncThunk<void, AddCategoryForm, { dispatch: AppDispatch }>(
    'categories/addCategory',
    async (categoryData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));

            await axiosApi.post('/categories.json', categoryData);

            thunkAPI.dispatch(fetchCategories());
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);

export const editCategory = createAsyncThunk<void, { categoryId: string, categoryData: AddCategoryForm }, { dispatch: AppDispatch }>(
    'categories/editCategory',
    async ({ categoryId, categoryData }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));

            await axiosApi.put(`/categories/${categoryId}.json`, categoryData);

            thunkAPI.dispatch(fetchCategories());
        } catch (error) {
            console.error('Error editing category:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);

export const deleteCategory = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
    'categories/deleteCategory',
    async (categoryId, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));

            await axiosApi.delete(`/categories/${categoryId}.json`);

            thunkAPI.dispatch(fetchCategories());
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);
