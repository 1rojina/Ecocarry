import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (param) => {
    const category = param ? `category=${param}` : ' ';
    const { data } = await axios.get(
      `https://66bf1acb42533c40314511b6.mockapi.io/api/v1/bagshop?${category}`
    );

    return data;
  }
);
