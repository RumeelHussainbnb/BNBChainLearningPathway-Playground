import Head from 'next/head';

import {useGlobalState} from 'context';
import {getChainLabel} from 'utils/context';

export default function HeadLayout() {
  const {state} = useGlobalState();
  const label = getChainLabel(state);
  return (
    <Head>
      <title>{`BNB Chain Learning Pathway`}</title>
      <meta name="description" content="BNB Chain Web3 Education Courses" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
