import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach,
} from "vitest"
import App from "../app"
import * as hotelService from "../services/hotel-services"
import * as countryService from "../services/country-services"
import * as cityService from "../services/city-services"
import { mockHotels } from "./__mocks__/hotel"
import { mockCuntries } from "./__mocks__/country"
import { mockCities } from "./__mocks__/city"

vi.mock("../services/hotel-services");
vi.mock("../services/country-services");
vi.mock("../services/city-services");

const mockedHotelService = vi.mocked(hotelService, true)
const mockedCountryService = vi.mocked(countryService, true)
const mockedCityService = vi.mocked(cityService, true)

describe("Home", () => {
  beforeEach(() => {
    mockedHotelService.getHotels.mockResolvedValue(mockHotels)
    mockedCountryService.getCountries.mockResolvedValue(mockCuntries)
    mockedCityService.getCities.mockResolvedValue(mockCities)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Content Search', () => {
    const searchBarPlaceHolder = "Start searching your new stay..."
    
    it("should render search input", () => {
        render(<App />)
        const input = screen.getByPlaceholderText(searchBarPlaceHolder)
        expect(input).toBeInTheDocument()
    })

    it("should render the SearchBar and handle input correctly", async () => {
        render(<App />)

        const input = screen.getByPlaceholderText(searchBarPlaceHolder)

        const searchContent = "Cal"
        userEvent.type(input, searchContent)

        await waitFor(() => {
            expect(mockedHotelService.getHotels).toHaveBeenCalledWith(searchContent)
            expect(mockedCountryService.getCountries).toHaveBeenCalledWith(searchContent)
            expect(mockedCityService.getCities).toHaveBeenCalledWith(searchContent)
        })

        expect(screen.getByText("Hotels")).toBeInTheDocument()
        expect(screen.getByText("Countries")).toBeInTheDocument()
        expect(screen.getByText("Cities")).toBeInTheDocument()

        expect(screen.getByText("Hotel Intercontinental Cali")).toBeInTheDocument()
        expect(screen.getByText("Colombia (CO)")).toBeInTheDocument()
        expect(screen.getByText("Cali")).toBeInTheDocument()
    })

    it("should clear searchBar and hide dropdown content", async () => {
        render(<App />)

        const input = screen.getByPlaceholderText(searchBarPlaceHolder)
        userEvent.type(input, "In")

        await waitFor(() => {
            expect(screen.getByText("The Oberoi Rajvilas Jaipur Hotel")).toBeInTheDocument()
            expect(
                screen.getByRole("search-results")
            ).toBeInTheDocument()
        })

        const clearButton = screen.getByRole("clear-search")
        userEvent.click(clearButton)

        await waitFor(() => {
            expect(input).toHaveValue("")
        })

        expect(
            screen.queryByRole("search-results")
        ).not.toBeInTheDocument()
    })
  })
})