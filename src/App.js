import { Router, Route, Switch } from 'react-router-dom'
import { createHashHistory } from 'history'

// Components
import Container from './components/Container'
import Content from './components/Content'
import Header from './components/Header'
import Menu from './components/Menu'

// Constants
import { MICROFRONTEND_NAME } from './constants'

// Routes
import MicroFrontend from './routes/MicroFrontend'

const history = createHashHistory()

const Browse = (props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.BROWSE} />
)

const Restaurant = (props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.RESTAURANT} />
)

const About = (props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.ABOUT} />
)

function App(props) {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Menu />
      </Container>
      <Content>
        <Switch>
          <Route exact path="/" component={Browse} />
          <Route path="/restaurant/:id" component={Restaurant} />
          <Route path="/about" component={About} />
        </Switch>
      </Content>
    </Router>
  )
}

export default App
