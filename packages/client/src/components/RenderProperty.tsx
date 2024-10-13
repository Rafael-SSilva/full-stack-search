interface RenderPropertyParams {
    label: string
    content: React.ReactNode
  }
  
export const RenderProperty = ({label, content}: RenderPropertyParams) => {
  
    if(!content){
      return null
    }
  
    return (
      <p>
        <strong>{label}</strong> {content}
      </p>
    )
}