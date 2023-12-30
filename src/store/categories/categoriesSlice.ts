    import { createSlice, PayloadAction } from '@reduxjs/toolkit';
    import { RootState } from '../../app/store';
    import {AddCategoryForm, Category} from "../../types";

    interface CategoriesState {
        categories: Record<string, Category>;
        fetchLoading: boolean;
    }

    const initialState: CategoriesState = {
        categories: {},
        fetchLoading: false,
    };

    export const categoriesSlice = createSlice({
        name: 'categories',
        initialState,
        reducers: {
            setCategories: (state, action: PayloadAction<Record<string, Category>>) => {
                state.categories = action.payload;
                state.fetchLoading = false;
            },
            setFetchLoading: (state, action: PayloadAction<boolean>) => {
                state.fetchLoading = action.payload;
            },

            editCategory: (state, action: PayloadAction<{ categoryId: string, categoryData: AddCategoryForm }>) => {
                const { categoryId, categoryData } = action.payload;
                state.categories[categoryId] = { ...state.categories[categoryId], ...categoryData };
            },
            deleteCategory: (state, action: PayloadAction<string>) => {
                const categoryId = action.payload;
                delete state.categories[categoryId];
            },
        },
    });

    export const { setCategories, setFetchLoading } = categoriesSlice.actions;

    export const selectCategories = (state: RootState) => state.categories.categories;
    export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;

    export default categoriesSlice.reducer;
