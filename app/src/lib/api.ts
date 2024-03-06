import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: "http://192.168.1.100:3001",
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if(error.response.status === 500 && error.response.status === 500) {
      await AsyncStorage.clear()
    }
  }
)