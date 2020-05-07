/* eslint-disable camelcase */
import logo from 'assets/images/logo.svg'
import profile from 'assets/images/profile.png'
import birdFly from 'assets/images/bird-fly.svg'
import birdLpFly from 'assets/images/bird-lp-fly.svg'
import laptop from 'assets/images/laptop.svg'
import step1 from 'assets/images/step1.png'
import step2 from 'assets/images/step2.png'
import step3 from 'assets/images/step3.png'
import step1mob from 'assets/images/step1mob.png'
import step2mob from 'assets/images/step2mob.png'
import step3mob from 'assets/images/step3mob.png'

import aleoBold from 'assets/fonts/Aleo-Bold.otf'
import aleoItalic from 'assets/fonts/Aleo-Italic.otf'
import aleoRegular from 'assets/fonts/Aleo-Regular.otf'

export const images = {
  logo,
  profile,
  birdFly,
  birdLpFly,
  laptop,
  step1,
  step2,
  step3,
  step1mob,
  step2mob,
  step3mob,
}

export const colors = {
  yellow: '#fabf44',
  lightYellow: 'rgba(251, 192, 68, .3)',

  // orange
  orange: '#ef9748',
  lightOrange: '#fdf5ed',

  // red
  red: '#ee544e',
  darkRed: '#b02929',

  // blue
  blue: '#6599f8',
  lightBlue: '#eaf5ff',

  // green
  green: '#33cb9a',
  lightGreen: '#e9fef3',

  // gray
  gray: '#cacaca',
  lightDarkGray: '#838181',
  darkGray: '#425471',
  lightGray: '#ececec',
  lightBlueGray: '#f4fafa',

  // black
  black: '#0a2239',
  lightBlack: '#23384d',

  // white
  lightWhite: 'rgba(255, 255, 255, .1)',
}

export const fonts = {
  aleo: {
    normal: {
      uri: aleoRegular,
      name: 'AleoRegular',
    },
    italic: {
      uri: aleoItalic,
      name: 'AleoItalic',
    },
    bold: {
      uri: aleoBold,
      name: 'AleoBold',
    },
  },
}

export const breakpoints = {
  phone: '@media (max-width: 576px)',
  tablet: '@media (max-width: 768px)',
  laptop: '@media (max-width: 992px)',
  desktop: '@media (max-width: 1280px)',
}
