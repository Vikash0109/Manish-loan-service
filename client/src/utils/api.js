import axios from 'axios';
import { apiBaseUrl } from './content';

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
