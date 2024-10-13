import { useState } from "react"
import { SearchBar } from "../components/Search/SearchBar"
import { SearchResults } from "../components/Search/SearchResults"
import { useDebounce } from "../hooks/useDebounce"
import { useSearchResults } from "../hooks/useSearchResults"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const debouncedValue = useDebounce(inputValue, 300)

  const {
    hotels,
    countries,
    cities,
    clearSearch,
  } = useSearchResults(debouncedValue, setInputValue)

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-top pt-4">
          <div className="col-md-6">
            <div className="dropdown">
              <SearchBar
                value={inputValue}
                onSearch={setInputValue}
                onClear={clearSearch}
              />
              {inputValue ? (
                <SearchResults
                  hotels={hotels}
                  countries={countries}
                  cities={cities}
                />
              ): null }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
