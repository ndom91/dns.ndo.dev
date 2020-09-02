import React from 'react';

import { LoadScript } from '../LoadScript';
import * as S from './styles';

//icons
import globeEurope from '../../icons/globe-europe.svg';

function BuyButton({ startLoading, buy }) {

  return (
    <LoadScript startLoading={startLoading} src="https://cdn.paddle.com/paddle/paddle.js">
      {ready => (
        <S.Button
          disabled={!ready}
          onClick={()=> window.open("https://ndo.dev/blog/another-do-h-server#client", "_blank")}
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            if ((e.which === 13 || e.which === 32) && ready) {
              buy(e);
            }
          }}
        >
          <S.AppleIcon icon={globeEurope} />
          <span>Use Now</span>
        </S.Button>
      )}
    </LoadScript>
  );
}

export default BuyButton;
