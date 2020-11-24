import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import './App.css';
import Card from './card.component';

const Button = styled.button`
  background-color: greenyellow;
  color: black;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin: 20px 0px 0px 0px;
`;

const Title = styled.h1`
  font-size: 25px;
  color: mediumblue;
  font-weight: bold;
`;

const initialState = {
  user: null,
  searchQuery: ' '
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload  }
  
    default:
      return state;
  }
}

const setUser = user => ({
  type: 'SET_USER',
  payload: user
})

const setsearchQuery = queryString => ({
  type: 'SET_SEARCH_QUERY',
  payload: queryString
})


const App =() => {
 
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, searchQuery} = state;

  useEffect(() => {

    if (searchQuery.length > 0) {
        const fetchFunc = async () => {
        const searchTerm = searchQuery.charAt(0).toLocaleUpperCase() + searchQuery.slice(1)
        console.log(searchTerm)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${searchTerm}`);
        const resJson =  await response.json();
  
        dispatch(setUser(resJson[0]))
      }
      fetchFunc();
    }
    
    return () => {} // cleanup purposes
  }, [searchQuery])

  return (
      <Card>
          <Title>React hooks: Search through a list of users </Title>
           
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="Username" value={searchQuery} onChange={event => dispatch(setsearchQuery(event.target.value))}/>
          <label htmlFor="name" className="form__label">Username</label>
        </div>

        {/* <Button>Search</Button> */}
        {user ?
        <div style={{border: '0.5px solid green', marginTop: '10px'}}>
          <h3>{user.name}</h3>
          <h3>{user.username}</h3>
          <h4>{user.email}</h4>
          <h4>{user.website}</h4>
          <h5>{user.address.street}</h5>
          <h6>{user.company.name}</h6>
        </div> : <p>User: {searchQuery} not found</p>}
        <p style={{fontSize: '12px'}}>users: Bret, Karianne, Delphine</p>       
      </Card>
  );
}

export default App;
