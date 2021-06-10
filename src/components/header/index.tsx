import React from 'react';
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 64,
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      backgroundColor: '#F0F2F5'
    }}>
      <Link style={{ margin: '0 12px' }} to="/">Home</Link>
      <Link style={{ margin: '0 12px' }} to="/history">History</Link>
    </div>
  )
}

export default Header;
