import React, { useRef, useState } from 'react';

//icons (imported as svg using babel plugin)
import faBatteryFull from '../../icons/bat-charge.svg';
import faVolumeUp from '../../icons/volume-up.svg';
import faWifi from '../../icons/wifi.svg';
import faFeather from '../../icons/feather.svg';
import dnsPlaceholder from '../../images/dns-placeholder.gif'

//styles
import * as S from './styles';
import * as A from '../../styles/shared-components';

//components
import DayNightSwitch from '../DayNightSwitch';
import MenuBar from '../MenuBar';
import Compose from '../Compose';
import BuyButton from '../BuyButton';
import Background from '../Background';

//hooks
import {
  useGoogleAnalytics,
  useHovered,
  useToggleBodyClass,
  useFindElementCenter,
  useMousePosition,
  useCanHover,
  useClock
} from '../../utils/hooks';

import useIntroAnimation from './use-intro-animation';

import 'focus-visible';
import { routes } from '../../config/routes';
import { useRouter } from 'react-tiniest-router';
import { isDev } from '../../utils/dev-prod';

//env
const {
  REACT_APP_ANALYTICS_ID,
  REACT_APP_PADDLE_VENDOR,
  REACT_APP_PADDLE_PRODUCT_ID,
  REACT_APP_DOWNLOAD_LINK
} = process.env;
const canBuyInDev = true;

const redirectDownload = () => {
  if (window.location.href.includes('get-app')) {
    window.location.replace(REACT_APP_DOWNLOAD_LINK);
  }
};

function Home({ isAnimationDone, night }) {
  redirectDownload();

  const [composeIsOpen, setComposeOpen] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);

  const [text, setText] = useState(
    `Woah! With dns.ndo.dev I can use Twitter DMs and tweet directly from the menubar. Sweet! 😄️`
  );

  // refs
  const contentRef = useRef();
  const messagesWindowRef = useRef();

  //custom hooks
  const { fabPose, menuBarPose, messagesPose, homePose } = useIntroAnimation(true, isAnimationDone);
  const canHover = useCanHover();
  const isHoveringMessages = useHovered();
  const isHoveringCompose = useHovered();
  const windowCenter = useFindElementCenter(messagesWindowRef);
  const { y: mouseY } = useMousePosition(isHoveringCompose.value);
  const clock = useClock();
  const { goTo } = useRouter();

  // side effects
  useGoogleAnalytics(REACT_APP_ANALYTICS_ID, isAnimationDone.value);
  useToggleBodyClass(isAnimationDone.value, ['scroll', 'no-scroll']);

  // computed
  const isNotHoveringMenuBar = mouseY === null || mouseY >= 25;
  const showComposeWindow = composeIsOpen || (isHoveringCompose.value && isNotHoveringMenuBar);
  const isBig = window.innerWidth > 450;

  // methods
  const onToggleNight = () => {
    night.toggle();
    setToggleCount(toggleCount + 1);
  };

  const buy = async () => {
    if (isDev) {
      if (canBuyInDev === false) {
        return alert('Buying app...');
      }
    }

    if (window) {
      const { Paddle } = window;
      await Paddle.Setup({ vendor: parseInt(REACT_APP_PADDLE_VENDOR) });
      Paddle.Checkout.open({
        product: parseInt(REACT_APP_PADDLE_PRODUCT_ID),
        allowQuantity: false,
        quantity: 1,
        successCallback: async result => {
          const { checkout } = result;
          if (checkout.completed) {
            goTo(routes.checkout, { checkoutId: checkout.id });
          }
        }
      });
    }
  };

  return (
    <S.Home>
      <S.MainSection>
        <Background night={night.value} startLoadingLight={isAnimationDone.value} show={isBig} />

        <MenuBar
          className="menubar"
          pose={menuBarPose}
          selected={showComposeWindow}
          onClick={() => setComposeOpen(v => !v)}
          mainIcon={faFeather}
          icons={[faWifi, clock, faVolumeUp, '100%', faBatteryFull]}
        />

        <Compose
          {...isHoveringCompose.bind}
          text={text}
          setText={setText}
          setComposeOpen={setComposeOpen}
          composeIsOpen={composeIsOpen}
          visible={showComposeWindow}
        />

        <S.Content ref={contentRef}>
          <S.WindowBox ref={messagesWindowRef} initialPose="hidden" pose={homePose} {...windowCenter}>
            <S.HeroImg src={dnsPlaceholder} alt="Placeholder Gif" /> 
          </S.WindowBox>

          <A.Space huge />

          <S.TextContent isAnimationDone={isAnimationDone.value} pose={homePose}>
            <S.Title> dns.ndo.dev </S.Title>

            <A.Space huge />
            <S.Subtitle>
              <span>
                Focused on <A.Hover onClick={() => window.open("https://dns.ndo.dev/privacy.html")}>privacy</A.Hover> and <A.Hover onClick={() => window.open('https://ndo.dev/blog/another-do-h-server#benchmarks')}>performance</A.Hover> </span>
              <br />
              {/* <span>The timeline can wait.</span> */}
            </S.Subtitle>

            <A.Space />

            <BuyButton buy={buy} startLoading={isAnimationDone.value} />

            <A.Space />

            <S.Platforms>Supports android, macOS, Windows, and Linux</S.Platforms>

            <A.Space />

            <DayNightSwitch value={night.value} onChange={onToggleNight} />
          </S.TextContent>
        </S.Content>
      </S.MainSection>
      <S.Footer initialPose="hidden" pose={composeIsOpen ? 'invisible' : menuBarPose}>
        <S.Links>
          <S.Link href="mailto:dns@ndo.dev">Contact</S.Link>
          <S.Link href="privacy.html">Privacy</S.Link>
          <S.Link target="_blank" rel="noopener" href="https://github.com/ndom91/dns.ndo.dev">
            View Source
          </S.Link>
          {/*<S.Link onClick={() => goTo(routes.license)}>Retrieve license</S.Link>*/}
        </S.Links>
      </S.Footer>
    </S.Home>
  );
}

export default Home;
