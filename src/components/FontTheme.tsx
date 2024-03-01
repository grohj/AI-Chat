import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Midnight';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url(../media/oh-so.otf); format('otf');
      };
      @font-face {
        font-family: 'Midnight Fat';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url(../media/oh-so-fat.otf); format('otf');
      }
      `}
  />
)

export default Fonts