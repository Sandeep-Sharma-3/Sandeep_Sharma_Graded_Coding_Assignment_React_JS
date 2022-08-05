import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListMovieItems from './components/ListMovieItems';
import NavigationMenu from './components/NavigationMenu';
import Home from './Home';

function App() {
  const [searchMovie, setSearchMovie] = useState<string|undefined>();
  const searchCallback = (searchMovie : string|undefined) => {
    setSearchMovie(searchMovie);
  };

  return (
    <BrowserRouter>
      <NavigationMenu searchMovie={searchCallback}/>
      <Container>    
        <Switch>
          <Route path="/:movieListType" render={(props) => <ListMovieItems {...props} searchQuery={searchMovie}/>} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
