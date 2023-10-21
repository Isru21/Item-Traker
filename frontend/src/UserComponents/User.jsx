import styled from "styled-components"

const User = ({user}) => {
    
    

  return (
    <MainBody>

    <OtherInfo>Employee</OtherInfo>
      <Employe>name: {user.name} </Employe>
      <Employe>phone number:{user.phone} </Employe>
    </MainBody>
  )
}

export default User

const MainBody = styled.div`
background: rgba(247, 247, 221);
margin: 5px 7px;
padding: 25px 20px;
cursor: pointer;
border-radius: 0.375rem; `
const Employe=styled.h3`
display: flex;
align-items: center;
justify-content: space-between;
`
const OtherInfo=styled.p`
`

