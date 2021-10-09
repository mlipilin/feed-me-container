import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

// Constants
import { MICROFRONTEND_HOST, MICROFRONTEND_NAME } from '../../constants'

const CONTAINER_ID = 'microfrontend-container'

const TITLE = {
  [MICROFRONTEND_NAME.ABOUT]: 'About',
  [MICROFRONTEND_NAME.BROWSE]: 'Browse Restaurants',
  [MICROFRONTEND_NAME.SURPRISE]: 'Surprise Me',
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(src)) {
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

function safetyCall(fn, ...args) {
  typeof fn === 'function' && fn(...args)
}

function renderMicrofrontend(name) {
  safetyCall(window[`render${name}`], CONTAINER_ID)
}

function unmountMicrofrontend(name) {
  safetyCall(window[`unmount${name}`], CONTAINER_ID)
}

function MicroFrontend(props) {
  const { name } = props

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

  const makeScriptUrl = useCallback(
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
    fetch(makeScriptUrl('asset-manifest.json'))
      .then((response) => response.json())
      .then(({ entrypoints }) => {
        const scripts = entrypoints
          .filter((e) => /static\/js/.test(e))
          .map(makeScriptUrl)
        return Promise.all(scripts.map(loadScript))
      })
      .then(() => {
        // console.log('all scripts are loaded')
        renderMicrofrontend(name)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [host])

  return <main id={CONTAINER_ID} />
}

MicroFrontend.propTypes = {
  name: PropTypes.oneOf(Object.values(MICROFRONTEND_NAME)).isRequired,
}

export default MicroFrontend
