import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ButtonLoading } from './components/loadingButton'
import { useAppDispath, useAppSelector } from './hooks/redux'
import { fetchBooks } from "./store/reducers/ActionCreators"
import { useEffect, useState } from "react"
import { Input } from './components/ui/input'
import { Button } from "./components/ui/button"

function App() {
  const { books, isLoading, error } = useAppSelector(state => state.bookSlicer)
  const [inputState, setInputState] = useState('')
  const [selectState, setSelectState] = useState('')

  const dispatch = useAppDispath()

  // useEffect(() => {
  //   dispatch(fetchBooks())
  // }, [])

  return (
    <>
      <Input onChange={(e) => setInputState(e.target.value)} />
      <Button variant={'destructive'} onClick={() => dispatch(fetchBooks())}>Найти</Button>
      <Select onValueChange={(e) => setSelectState(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {isLoading ?
        <ButtonLoading />
        :
        null
      }
    </>
  )
}

export default App
