import { City, Country, Hotel } from "shared"
import { SearchResultItem } from "./ResultItem"
import { SearchResultWithHeading } from './ResultHeading'

export interface SearchResult {
  hotels: Hotel[]
  countries: Country[]
  cities: City[]
}

export function SearchResults({ hotels, countries, cities }: SearchResult) {
  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2" role="search-results">
      <SearchResultWithHeading heading="Hotels">
      {!hotels.length ? (
        <p>No hotels matched</p>
      ) : (
        hotels.map((hotel, index) => (
          <SearchResultItem
            key={index}
            label={hotel.hotel_name}
            link={`/hotels/${hotel._id}`}
          />
        ))
      )}
    </SearchResultWithHeading>

      <SearchResultWithHeading heading="Countries">
        {!countries.length ? (
            <p>No countries matched</p>
        ) : (
            countries.map((country, index) => (
            <SearchResultItem
                key={index}
                label={`${country.country} (${country.countryisocode})`}
                link={`/countries/${country._id}`}
            />
            ))
        )}
      </SearchResultWithHeading>

      <SearchResultWithHeading heading="Cities">
        {!cities.length ? (
        <p>No cities matched</p>
        ) : (
        cities.map((city, index) => (
            <SearchResultItem
            key={index}
            label={city.name}
            link={`/cities/${city._id}`}
            />
        ))
        )}
      </SearchResultWithHeading>
    </div>
  )
}