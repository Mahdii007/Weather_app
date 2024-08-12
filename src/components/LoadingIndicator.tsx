import React from 'react';
import loadingGif from '../assets/images/loading.gif';

const LoadingIndicator: React.FC = () => (
  <img className="loader" src={loadingGif} alt="loading" />
);

export default LoadingIndicator;
