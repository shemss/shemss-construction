/*
 * Starts any clocks using the user's local time
 * From: cssanimation.rocks/clocks
 */
const initLocalClocks = () => {
  // Get the local time using JS
  const date    = new Date;
  const seconds = date.getSeconds()
  const minutes = date.getMinutes()
  const hours   = date.getHours()

  // Create an object with each hand and it's angle in degrees
  const hands = [
    {
      selector: '.hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      selector: '.minutes',
      angle: (minutes * 6)
    },
    {
      selector: '.seconds',
      angle: (seconds * 6)
    }
  ]

  // Loop through each of these hands to set their angle
  hands.forEach((hand, j) =>
    document.querySelectorAll(hand.selector).forEach(element => {
      element.style.transform = `rotateZ(${hand.angle}deg)`
      // If this is a minute hand, note the seconds position (to calculate minute position later)
      if (hand.selector == '.minutes')
        element.parentNode.dataset.secondAngle = hands[j + 1].angle
    })
  )

  setUpMinuteHands()
  moveSecondHands()
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
const setUpMinuteHands = () => {
  // Find out how far into the minute we are
  const containers = document.querySelectorAll('.minutes-container')
  const secondAngle = parseInt(containers[0].dataset.secondAngle)
  if (secondAngle > 0) {
    // Set a timeout until the end of the current minute, to move the hand
    const delay = (((360 - secondAngle) / 6) + 0.1) * 1000
    setTimeout(() => moveMinuteHands(containers), delay)
  }
}

/*
 * Do the first minute's rotation
 */
function moveMinuteHands (containers) {
  containers.forEach(container => container.style.transform = 'rotateZ(6deg)')
  // Then continue with a 60 second interval
  setInterval(() => containers.forEach(container => {
    container.angle = (container.angle || 6) + 6
    container.style.transform = `rotateZ(${container.angle}deg)`
  }), 60000)
}

/*
 * Move the second containers
 */
const moveSecondHands = () => {
  const containers = document.querySelectorAll('.seconds-container')
  setInterval(() => containers.forEach(container => {
    container.angle = (container.angle || 0) + 6
    container.style.transform = `rotateZ(${container.angle}deg)`
  }), 1000)
}

export default initLocalClocks
