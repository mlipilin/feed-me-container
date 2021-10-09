import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Container from './components/Container'
import Content from './components/Content'
import Header from './components/Header'
import Menu from './components/Menu'

// Constants
import { MICROFRONTEND_NAME } from './constants'

// Routes
import MicroFrontend from './routes/MicroFrontend'

const Browse = (...props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.BROWSE} />
)

const Surprise = (...props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.SURPRISE} />
)

const About = (...props) => (
  <MicroFrontend {...props} name={MICROFRONTEND_NAME.ABOUT} />
)

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Menu />
        <Content>
          <Switch>
            <Route path="/surprise" component={Surprise} />
            <Route path="/about" component={About} />
            <Route path="/" component={Browse} />
          </Switch>
        </Content>
      </Container>
    </Router>
  )
}

export default App
