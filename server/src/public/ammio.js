'use strict'

import { v4 as uuid } from 'https://jspm.dev/uuid'

/**
 * determine if tracking has been disabled using DNT (do not track) browser setting
 * @returns {Boolean} true: tracking enabled | false: tracking disabled by DNT
 */
function tracking () {
  if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external) {
    if (window.doNotT === '1' || navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1' || window.external.msTrackingProtectionEnabled()) return false
    else return true
  } else return true
}

/**
 * get or generate new unique browser fingerprint
 * @returns {string} browser fingerprint
 */
function fingerprint () {
  const storage = window.localStorage
  if (storage.getItem('ammio_fingerprint')) return storage.getItem('ammio_fingerprint')
  else {
    const fingerprint = uuid()
    storage.setItem('ammio_fingerprint', fingerprint)
    return fingerprint
  }
}

/**
 * determine device type
 * @returns {string} device type (mobile, tablet, desktop)
 */
function device () {
  const userAgent = window.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) return 'tablet'
  else if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) return 'mobile'
  return 'desktop'
}

/**
 * determine browser
 * @returns {string} browser name (Opera, Chrome, Safari, Firefox, IE, Unknown)
 */
function browser () {
  if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) return 'Opera'
  else if (navigator.userAgent.indexOf('Chrome') !== -1) return 'Chrome'
  else if (navigator.userAgent.indexOf('Safari') !== -1) return 'Safari'
  else if (navigator.userAgent.indexOf('Firefox') !== -1) return 'Firefox'
  else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) return 'IE'
  else return 'Unknown'
}

/**
 * process and send ammio analytics
 */
async function ammio () {
  /* AMMIO SERVER URL & PORT */
  const script = document.getElementById('ammio')
  let { hostname, port } = new URL(script.src)

  if (script.getAttribute('ammio_url')) {
    const url = new URL(script.getAttribute('ammio_url'))
    hostname = url.hostname
    port = url.port
  }

  /* ANALYTICS DATA */
  const analytics = {
    fingerprint: fingerprint(),
    page: window.location.pathname,
    referrer: window.document.referrer,
    browser: browser(),
    os: navigator.platform,
    device: device(),
    language: navigator.language,
    website: script.getAttribute('website_id')
  }

  /* SEND ANALYTICS DATA */
  const response = await fetch(`http://${hostname}:${port}/analytics`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(analytics) }) // eslint-disable-line no-undef
  const visit = await response.json()

  /* SEND PING */
  if (!navigator.sendBeacon) return
  setInterval(async () => {
    console.log('ping')
    const ping = JSON.stringify({ fingerprint: analytics.fingerprint, visit: visit })
    navigator.sendBeacon(`http://${hostname}:${port}/analytics/ping`, ping)
  }, 1000 * 60)

  /* CALCULATE VISIT DURATION */
  let start = new Date()
  let duration = 0
  const focus = () => { start = new Date() }
  const blur = () => { duration += (new Date() - start.getTime()) / 1000 }
  window.addEventListener('focus', focus)
  window.addEventListener('blur', blur)

  /* SEND CLOSE DATA ON PAGE UNLOAD */
  function unload () {
    if (unload._hasUnloaded) return
    unload._hasUnloaded = true
    blur()
    const close = JSON.stringify({ fingerprint: analytics.fingerprint, duration: duration, visit: visit.id })
    navigator.sendBeacon('http://localhost:3000/analytics/close', close)
  }
  window.addEventListener('unload', unload)
  window.addEventListener('pagehide', unload)
}

if (tracking()) ammio()
