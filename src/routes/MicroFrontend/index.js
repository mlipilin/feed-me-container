import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

// Constants
import { MICROFRONTEND_HOST, MICROFRONTEND_NAME } from '../../constants'

const CONTAINER_ID = 'microfrontend-container'

const TITLE = {
  [MICROFRONTEND_NAME.ABOUT]: 'About',
  [MICROFRONTEND_NAME.BROWSE]: 'Browse Restaurants',
  [MICROFRONTEND_NAME.RESTAURANT]: 'Restaurant',
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
  typeof fn === 'function' && fn(...args)
}

function renderMicrofrontend(name, history) {
  safetyCall(window[`render${name}`], CONTAINER_ID, history)
}

function unmountMicrofrontend(name) {
  safetyCall(window[`unmount${name}`], CONTAINER_ID)
}

function MicroFrontend(props) {
  const { history, name } = props

  const host = MICROFRONTEND_HOST[name]

  useEffect(() => {
    // console.log('MOUNT', { name })
    document.title = `${TITLE[name]} - Feed Me`
    loadMicroFrontend()
    return () => {
      // console.log('UNMOUNT', { name })
      unmountMicrofrontend(name)
    }
  }, [name])

  const makeAssetUrl = useCallback(
    (script) => {
      return `${host}/${script}`
    },
    [host]
  )

  const loadMicroFrontend = useCallback(() => {
    // console.log('loadMicroFrontend', { host })
    if (!host) {
      return
    }
    fetch(makeAssetUrl('asset-manifest.json'))
      .then((response) => response.json())
      .then(({ entrypoints }) => {
        const scripts = entrypoints
          .filter((e) => /static\/js/.test(e))
          .map(makeAssetUrl)
        const styles = entrypoints
          .filter((e) => /static\/css/.test(e))
          .map(makeAssetUrl)
        return Promise.all([
          ...scripts.map(loadScript),
          ...styles.map(loadStyle),
        ])
      })
      .then(() => {
        // console.log('all scripts and styles are loaded')
        renderMicrofrontend(name, history)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [host])

  return <main id={CONTAINER_ID} />
}

MicroFrontend.propTypes = {
  history: PropTypes.object.isRequired,
  name: PropTypes.oneOf(Object.values(MICROFRONTEND_NAME)).isRequired,
}

export default MicroFrontend
