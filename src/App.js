import { useState, useEffect } from 'react';
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

const App =() => {

  const [user, setUser] = useState(null)
  const [searchQuery, setsearchQuery] = useState('Kamren');

  useEffect(() => {
    const fetchFunc = async () => {
      const searchTerm = searchQuery.charAt(0).toLocaleUpperCase() + searchQuery.slice(1)
      console.log(searchTerm)
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${searchTerm}`);
      const resJson =  await response.json();

      setUser(resJson[0])
    }
    fetchFunc();
    return () => {} // cleanup purposes
  }, [searchQuery])

  return (
      <Card>
        <div>
          <input type='text' value={searchQuery} onChange={event => setsearchQuery(event.target.value)}/>         
        </div>

        <Button>Search</Button>
        {user ?
        <div>
          <h2>{user.name}</h2>
          <h3>{user.username}</h3>
          <h3>{user.email}</h3>
          <h4>{user.website}</h4>
          <h5>{user.address.street}</h5>
          <h6>{user.company.name}</h6>
        </div> : <p>User not found</p>}      
      </Card>
  );
}

export default App;
