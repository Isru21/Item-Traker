
import styled from 'styled-components/macro'
import Item from './Item'

const Items = ({items, deleteItem}) => {
  return (
    <Itemholder>
       {items.map((item) => (
        <Item
          key={item._id}
          item={item}
          deleteItem={deleteItem}
         
          
        //   updatesong={updatesong}
        />
      ))}
    </Itemholder>
  )
}

export default Items

const Itemholder = styled.div`
// display: flex;
// flex-direction: row;
// flex-wrap: wrap;
 background:  rgba(222,219,203,50%);
 border-radius:  1.435rem;
// margin: 0px 130px 
 padding: 50px;
 `


