// import styled from "styled-components"
import styled from 'styled-components'
import SearchedItem from './SearchedItem'

const SeachedItems = ({SearchedItems,deleteItem}) => {
    // console.log(SearchedItems)
  return (
    <Itemholder>
      {SearchedItems.map((searchedItem)=>(
        <SearchedItem
            key={searchedItem._id}
            searchedItem={searchedItem}
            deleteItem={deleteItem}
        />
      ))}
    </Itemholder>
    
  )
}

export default SeachedItems

const Itemholder = styled.div`
// display: flex;
// flex-direction: row;
// flex-wrap: wrap;
background:  rgba(222,219,203,50%);
 border-radius:1.435rem;
 //margin: 0px 130px 
 padding: 50px;
 `