import { ChangeEvent } from "react"

export function SearchBar({
    value,
    onSearch,
    onClear,
  }: {
    value: string
    onSearch: (value: string) => void
    onClear: () => void
  }) {
  return (
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder="Start searching your new stay..."
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onSearch(event.target.value)
        }
      />
      {value ? (
        <span role="clear-search" className="left-pan" onClick={onClear}>
          <i className="fa fa-close"></i>
        </span>
      ): null}
    </div>
  )
}