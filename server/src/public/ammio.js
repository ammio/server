'use strict'

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
 * process and send ammio analytics
 */
async function ammio () {

}

if (tracking()) ammio()
