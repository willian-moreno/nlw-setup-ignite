import axios from "axios";

export const api = axios.create({
  baseURL: 'http://10.113.52.35:3333'
})