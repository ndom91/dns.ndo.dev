import styled from 'styled-components';
import flex from '../../styles/flex';
import WindowShell from '../Window';
import pose from 'react-pose';
import FontAwesomeIcon from '../../icons/Icon.js';

import { applyTheme, getThemeColor, hover, when, whenNot } from '../../styles/mixins';
import { breakpoints, isHorizontal, smaller, widerThan, smallerHeight } from '../../styles/responsive';
import { ELEMENTS, zIndexFor } from '../../styles/zindex';

export const Text = styled.div(getThemeColor('text'));

export const WindowBox = styled(
  pose.div({
    [widerThan(breakpoints.phone)]: {
      hidden: {
        opacity: 0,
        x: 200
      },
      normal: { opacity: 1, y: 0, x: -70 },
    },
    [isHorizontal]: {
      normal: { opacity: 1, y: 0, x: 0 }
    }
  })
)({
  maxWidth: 385,
  [isHorizontal]: {
    margin: 'auto',
    width: 'unset',
    maxWidth: 'unset'
  }
});

export const HeroImg = styled.img({
  [widerThan(breakpoints.large)]: {
    width: '550px'
  },
  [smaller(breakpoints.large)]: {
    width: '450px',
  },
  [smaller(breakpoints.phone)]: {
    width: '450px',
    margin: 'auto'
  },
  [isHorizontal]: {
    margin: 'auto',
  }
})

export const Home = styled.div({
  ...flex.vertical,
  ...flex.centerVertical,
  flex: 1,
  minHeight: '100vh',
  minWidth: '100vw'
});

export const Subtitle = styled(Text)({
  fontSize: 25,
  fontWeight: 300,
  lineHeight: '40px',
  [smaller(950)]: {
    fontSize: 20
  },
  [smaller(breakpoints.medium)]: {
    fontSize: 18
  },
  [isHorizontal]: {
    fontSize: 18,
    lineHeight: '30px'
  }
});

export const Window = styled(WindowShell)(
  {
    transition: 'all 250ms linear',
    [isHorizontal]: {
      margin: 'auto',
      width: '100%'
    }
  },
  when('hovering', {
    transform: 'scale(1.03)',
    boxShadow: '0 20px 25px 12px rgba(0, 0, 0, 0.22)'
  })
);

export const Title = styled(Text)({
  fontWeight: 500,
  fontSize: 55,
  lineHeight: '50px',
  transition: 'all 250ms linear',
  cursor: 'default'
});

export const MainSection = styled.div({
  position: 'relative',
  ...flex.vertical,
  width: '100%',
  minHeight: '100vh',
  flex: 1,
  ...zIndexFor(ELEMENTS.MAIN_SECTION)
});

export const Padding = styled.div({
  padding: '60px 100px',
  [smaller(breakpoints.large)]: {
    padding: '30px 50px'
  },
  [smaller(breakpoints.medium)]: {
    padding: '20px 40px'
  },
  [isHorizontal]: {
    padding: '0'
  }
});

export const Footer = styled(
  pose.div({
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 30 },
    invisible: { opacity: 0, y: 0 }
  })
)(
  {
    position: 'fixed',
    ...zIndexFor(ELEMENTS.FOOTER),
    backgroundColor: '#393e52',
    transition: 'all 100ms linear',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: '7px 15px',
    overflow: 'hidden',
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    opacity: 0
  },
  ({ theme }) => ({
    ...(theme.name === 'light' && {
      backgroundColor: '#ffdc55'
    }),
    [smaller(750)]: {
      position: 'relative',
      ...zIndexFor(ELEMENTS.FOOTER),
      width: '100%',
      backgroundColor: theme.name === 'dark' ? '#243244' : '#b2cc9f'
    },
    [smallerHeight(715)]: {
      position: 'relative',
      ...zIndexFor(ELEMENTS.FOOTER),
      width: '100%'
    }
  })
);

export const Links = styled.div({
  ...flex.horizontal,
  ...flex.centerHorizontal
});

export const Link = styled.a(
  {
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'all 100ms linear',
    marginRight: 20,
    '&:last-of-type': {
      margin: 0
    },
    fontSize: 13,
    ...hover({
      borderBottom: '1px solid white'
    })
  },
  getThemeColor('text')
);

export const Content = styled(Padding)({
  ...flex.horizontal,
  ...zIndexFor(ELEMENTS.CONTENT),
  color: 'white',
  marginTop: 'auto',
  marginBottom: 'auto',
  [isHorizontal]: {
    flexDirection: 'column-reverse',
    ...flex.centerVertical
  }
});

export const TextContent = styled(
    pose.div({
      [widerThan(breakpoints.large)]: {
        normal: { 
          opacity: 1,
          x: 100 
      },
        hidden: { opacity: 0 }
      },
      [smaller(breakpoints.medium)]: {
        normal: { 
          opacity: 1,
          x: -200 
        },
        hidden: { opacity: 0 }
      },
    })
)(
  ({ theme }) => ({
    [widerThan(breakpoints.large)]: {
      marginLeft: '200px'
    },
    [smaller(breakpoints.large)]: {
      marginLeft: '50px'
    },
    [isHorizontal]: {
      margin: 'auto'
    }
  }),
  {
    ...flex.vertical,
    [isHorizontal]: {
      ...flex.centerVertical,
      textAlign: 'center'
    }
  },
  whenNot('isAnimationDone', {
    pointerEvents: 'none'
  })
);

export const Platforms = styled.div({
    fontSize: 12
});



