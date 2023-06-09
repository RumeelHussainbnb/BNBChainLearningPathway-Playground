import {Row, Space} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronRight} from 'react-feather';

import {colors, getChainColors} from 'utils/colors';
import logoSVG from 'public/figment-learn-compact.svg';
import {HEADER_HEIGHT} from 'lib/constants';
import {getChainLabel, getChainId} from 'utils/context';
import {useGlobalState} from 'context';

const Nav = () => {
  const {state} = useGlobalState();
  const currentChainId = getChainId(state);
  const chainLabel = getChainLabel(state);
  const {primaryColor, secondaryColor} = getChainColors(currentChainId);

  return (
    <StyledNav
      primary_color={primaryColor}
      align="middle"
      justify="space-between"
    >
      <Row align="middle">
        {/*<Image src={logoSVG} alt="BNB Chain Learn" height={47} width={100} />*/}
        <ChainTitle direction="horizontal" secondary_color={secondaryColor}>
          {/*<Link href="/">Pathways</Link>
          <ChevronRight style={{marginTop: '14px'}} />
          {chainLabel}*/}
          <Link href="/">BNB Chain Learning Pathway</Link>
        </ChainTitle>
      </Row>
    </StyledNav>
  );
};

const StyledNav = styled(Row)<{primary_color: string}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 10;
  padding: 0 40px;
  background: ${({primary_color}) => primary_color};
  border-bottom: solid 2px black;
`;

const ChainTitle = styled(Space)<{secondary_color: string}>`
  color: ${({secondary_color}) => secondary_color};
  font-size: 24px;
  font-weight: 600;
  margin-left: 24px;

  a {
    color: black;
    opacity: 1;
    text-decoration: none;
  }
`;

export default Nav;
