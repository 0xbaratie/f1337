import { ConnectButton } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <>
      <h1>How can we make a transation 1337?</h1>
      <p>~ Powered by farcaster & Base ~ </p>
      <div>
        <div>
          <span>1111</span>
          <span>2222</span>
          <span>3333</span>
          <span>4444</span>
          <span>5555</span>
        </div>
        <div>
          <span>1111</span>
          <span>2222</span>
          <span>3333</span>
          <span>4444</span>
          <span>5555</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>  
    </>
  );
};

export default App;
