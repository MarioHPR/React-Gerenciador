import React, { useState } from 'react';
import { Header, Footer } from '../../components';

export default function Home() {

  const [ collapsed, setCollapsed ] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
        <Header collapsed={ collapsed } toggleCollapsed={ toggleCollapsed } />
        <h1>Home</h1>
        <Footer />
    </>
  )
}
