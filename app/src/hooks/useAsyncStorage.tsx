import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, Dispatch, SetStateAction, useCallback } from "react";

type State<T> = Dispatch<SetStateAction<T>>

type Return<T> = [T, State<T>]

export function useAsyncStorage<T>(key: string, initialValue: T): Return<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  const setPersisteValue = useCallback<State<T>>((value) => {
    const persisteValueStoraged = value instanceof Function 
      ? value(storedValue) 
      : value
    setStoredValue(persisteValueStoraged)

    AsyncStorage
    .setItem(key, JSON.stringify(persisteValueStoraged))
    .catch((error) => { console.log(error)})

  }, [key, storedValue])


  useEffect(() => {
    async function loadStorage() {
      try {
        const value = await AsyncStorage.getItem(key)

        if(!value) return
        setStoredValue(JSON.parse(value))
      } catch (error) {
        console.log(error)
      }
    }

    loadStorage()
  }, [key])

  return [storedValue, setPersisteValue]
}