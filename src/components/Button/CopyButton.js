import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
// import { motion } from 'framer-motion'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { styler, colors } from 'styles'
import IconButton from './IconButton'

const styles = styler({
  root: {
    display: 'flex',
  },
  icon: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    color: 'white',
    background: colors.yellow,
    padding: '4px 16px',
    fontSize: 16,
  },
  animContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 3,
  },
  bird: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    position: 'absolute',
  },
})

// const randomBetween = (start, end) => {
//   return Math.random() * end + start
// }

// const decrement = max => {
//   let i = max
//   let minus = 1
//   const range = []
//   while (i > 0) {
//     i -= minus
//     range.push(i)
//     minus += 2
//   }
//   range.push(0)
//   return range
// }

// const swing = start => {
//   const range = [start]
//   let isLeft = randomBetween(0, 2) > 1
//   let swingRange = window.innerWidth / 15
//   for (let i = 0; i < 4; i += 1) {
//     const v = isLeft
//       ? start - randomBetween(0, swingRange)
//       : start + randomBetween(0, swingRange)
//     range.push(v)
//     swingRange += 50
//     isLeft = !isLeft
//   }
//   return range
// }

// const animateBirds = ({ x, y }) => {
//   const birds = []
//   for (let i = 0; i < 7; i += 1) {
//     birds.push(
//       <motion.img
//         initial={{ x, y }}
//         animate={{
//           x: swing(x),
//           y: decrement(y),
//           opacity: [0, 0.3, 0.8, 1, 1, 1, 0.8, 0.4, 0],
//         }}
//         transition={{
//           type: 'spring',
//           duration: 1.5,
//           delay: randomBetween(0, 0.3),
//           ease: 'easeIn',
//           stiffness: 260,
//           damping: 20,
//         }}
//         src={images.birdFly}
//         className={styles.bird}
//         alt="bird"
//       />,
//     )
//   }
//   return birds
// }

const CopyButton = ({ text }) => {
  const [tapped, setTapped] = useState(false)
  // const [coordinate, setCoordinate] = useState({
  //   x: window.innerWidth,
  //   y: window.innerHeight,
  // })
  return (
    <div className={styles.root}>
      <CopyToClipboard text={text}>
        <IconButton
          icon="copy"
          label={tapped ? 'Done!' : 'コピー'}
          iconClassName={styles.icon}
          className={`btn-yellow ${styles.button}`}
          onClick={() => {
            setTapped(true)
            // setCoordinate({ x: e.clientX, y: e.clientY })
            setTimeout(() => setTapped(false), 1700)
          }}
        />
      </CopyToClipboard>
      {/* {tapped && (
        <div className={styles.animContainer}>{animateBirds(coordinate)}</div>
      )} */}
    </div>
  )
}

CopyButton.propTypes = {
  text: PropTypes.string,
}

CopyButton.defaultProps = {
  text: '',
}

export default CopyButton
