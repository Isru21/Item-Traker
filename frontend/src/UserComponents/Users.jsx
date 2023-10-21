import User from './User'
import styled from 'styled-components'
const Users = ({users}) => {
  return (
    <Itemholder>
        <Title>Employees</Title>
      {users.map((user)=>(
        
        <User
            key={user._id}
            user={user}
        />
      ))}
    </Itemholder>
  )
}

export default Users

const Title = styled.h1`
    padding: 5% 45% 1% 45%
    
`
const Itemholder = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background:  rgba(222,219,203,50%);
border-radius:  1.435rem;
padding: 50px;
 `

