import { Vortex } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <Vortex
      visible={isLoading}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      wrapperStyle={{
        display: 'block',
        marginTop: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    />
  );
};

export default Loader;
