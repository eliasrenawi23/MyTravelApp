import './CompassItem.scss'

const CompassItem = (props: any) => {
    const {propsname ,state}=props; 
  return (
    <div className={"CompassItemContainer "+state +' '+propsname } >
        </div>
  )
}

export default CompassItem