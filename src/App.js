import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Container from './components/Container'
import Content from './components/Content'
import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Menu />
        <Content>
          <Switch>
            <Route path="/surprise">Surprise Me</Route>
            <Route path="/about">About</Route>
            <Route path="/">Browse Restaurants</Route>
          </Switch>
        </Content>
      </Container>
    </Router>
  )
}

export default App
