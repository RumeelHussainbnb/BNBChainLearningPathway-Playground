import {useState, useEffect} from 'react';
import {Alert, Space, Typography, Col, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';

import {getBNBChainTxExplorerURL} from '@figment-bnbchain/lib';
import {transfer} from '@figment-bnbchain/challenges';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Transfer = () => {
  const {dispatch} = useGlobalState();

  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const checkTransfer = async () => {
    setFetching(true);
    setError(undefined);
    setHash(undefined);
    const {error, hash} = await transfer();
    if (error) {
      setError(error);
    } else {
      setHash(hash);
    }
    setFetching(false);
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={checkTransfer}
          loading={fetching}
          size="large"
        >
          Transfer 0.01 BNB
        </Button>
        {hash ? (
          <>
            <Alert
              message={
                <Space direction="horizontal">
                  <Text strong>{`Transfer successfully completed`}</Text>
                  <a
                    href={getBNBChainTxExplorerURL(hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    (View on BscScan)
                  </a>
                </Space>
              }
              type="success"
              showIcon
            />
          </>
        ) : error ? (
          <Alert
            message={<Text strong>{`Transfer failed: ${error}`}</Text>}
            type="error"
            showIcon
          />
        ) : (
          <Alert message="Please Complete the code." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Transfer;
