import React from 'react'
import PropTypes from 'prop-types'

// Constants
import { MICROFRONTEND_HOST, MICROFRONTEND_NAME } from '../../constants'

const TITLE = {
  [MICROFRONTEND_NAME.ABOUT]: 'About',
  [MICROFRONTEND_NAME.BROWSE]: 'Browse Restaurants',
  [MICROFRONTEND_NAME.RESTAURANT]: 'Restaurant',
}

function getContainerId(name) {
  return `${name}-container`
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(src)) {
      // console.log(`script "${src}": loaded`)
      return resolve()
    }
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = src
    script.id = src
    document.head.appendChild(script)
  })
}

function loadStyle(href) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(href)) {
      // console.log(`link "${href}": loaded`)
      return resolve()
    }
    const link = document.createElement('link')
    link.onload = resolve
    link.onerror = reject
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = href
    link.id = href
    document.head.appendChild(link)
  })
}

function safetyCall(fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : undefined
}

function renderMicrofrontend(name, history) {
  safetyCall(window[`render${name}`], getContainerId(name), history)
}

function unmountMicrofrontend(name) {
  safetyCall(window[`unmount${name}`], getContainerId(name))
}

const makeAssetUrl = (host) => (script) => {
  return `${host}/${script}`
}

function loadMicroFrontend({ name, history }) {
  // console.log('loadMicroFrontend', { host })
  const host = MICROFRONTEND_HOST[name]
  if (!host) {
    return
  }
  fetch(makeAssetUrl(host)('asset-manifest.json'))
    .then((response) => response.json())
    .then(({ entrypoints }) => {
      const scripts = entrypoints
        .filter((e) => /static\/js/.test(e))
        .map(makeAssetUrl(host))
      const styles = entrypoints
        .filter((e) => /static\/css/.test(e))
        .map(makeAssetUrl(host))
      return Promise.all([...scripts.map(loadScript), ...styles.map(loadStyle)])
    })
    .then(() => {
      // console.log('all scripts and styles are loaded')
      renderMicrofrontend(name, history)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

class MicroFrontend extends React.Component {
  componentDidMount() {
    loadMicroFrontend(this.props)
  }

  componentDidUpdate() {
    document.title = `${TITLE[this.props.name]} - Feed Me`
  }

  componentWillUnmount() {
    unmountMicrofrontend(this.props.name)
  }

  render() {
    const { history, name } = this.props
    console.log(`MicroFrontend {${name}} history`, history)

    return <main id={getContainerId(name)} />
  }
}

MicroFrontend.propTypes = {
  history: PropTypes.object.isRequired,
  name: PropTypes.oneOf(Object.values(MICROFRONTEND_NAME)).isRequired,
}

export default MicroFrontend
