import styled from 'styled-components';
import flex from '../../styles/flex';
import Icon from '../../icons/Icon';
import pose from 'react-pose';
import { hover, when, applyTheme } from '../../styles/mixins';
import { smaller, breakpoints } from '../../styles/responsive';

import { ELEMENTS, zIndexFor } from '../../styles/zindex';

export const Compose = styled.div(
  {
    position: 'absolute',
    top: 25,
    right: 50,
    maxWidth: 400,
    width: '100%',
    ...zIndexFor(ELEMENTS.COMPOSE),
    transition: 'all 200ms ease-in',
    transform: `translateY(-250px)`,
    borderRadius: 7,
    overflow: 'hidden',
    opacity: 0,
    color: 'white',
    [smaller(breakpoints.phone)]: {
      maxWidth: 450,
      right: 0,
      left: 0,
      borderRadius: 0
    }
  },
  when('visible', {
    transform: `translateY(0)`,
    opacity: 1
  })
);

export const Overlay = styled(
  pose.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  })
)({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  position: 'fixed',
  top: 0,
  left: 0,
  ...zIndexFor(ELEMENTS.OVERLAY),
  height: '100vh',
  width: '100vw'
});

export const OverLimitText = styled.div({
  color: '#e0245d',
  fontSize: 14
});


export const IconWrap = styled.div(({ theme }) => ({
  ...flex.vertical,
  ...flex.centerVertical,
  transition: 'all 100ms linear',
  borderRadius: '100%',
  width: 35,
  height: 35,
  ...hover({
    backgroundColor: theme.name === 'dark' ? '#1b3549' : '#E8F5FE'
  })
}));

export const ActionIcon = styled(Icon)({
  fill: '#1da1f2',
  width: 18
});

export const Bar = styled.div(
  {
    ...flex.horizontal,
    ...flex.centerHorizontalV,
    justifyContent: 'flex-end',
    padding: '0px 10px',
    height: 50,
    borderBottom: '1px solid black'
  },
  applyTheme('composeBar')
);

export const Tweet = styled.button(
  {
    ...flex.vertical,
    ...flex.centerVertical,
    backgroundColor: '#1da1f2',
    color: 'white',
    borderRadius: 15,
    width: 75,
    height: 15,
    padding: 15,
    border: 'none',
    transition: 'all 100ms linear'
  },
  when(
    'disabled',
    { opacity: 0.5, cursor: 'default' },
    {
      ...hover({ backgroundColor: '#1a89d2' })
    }
  )
);

export const Content = styled.div(
  {
    padding: 10
  },
  applyTheme('composeWindow')
);

export const Bottom = styled.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  ...flex.spaceBetween
});

export const Input = styled.textarea(
  {
    borderRadius: 3,
    padding: 10,
    border: 'none',
    outline: 'none',
    minHeight: 105,
    width: '100%',
    resize: 'none',
    borderBottom: '2px solid #1da1f2'
  },
  applyTheme('composeInput'),
  when('disabled', {
    borderBottom: '2px solid #e0245d'
  })
);
