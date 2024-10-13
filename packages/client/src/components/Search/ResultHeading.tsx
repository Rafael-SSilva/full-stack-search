import { Fragment, PropsWithChildren } from "react"

export interface ResultHeadingProps extends PropsWithChildren{
    heading: string
  }
  
export const SearchResultWithHeading = ({ heading, children }: ResultHeadingProps) => {
  return (
      <Fragment>
          <h2>{heading}</h2>
          {children}
      </Fragment>
      
  )
}