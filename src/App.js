import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header />
      <div style={{ flex: 1 }}>Content</div>
      <Footer />
    </div>
  );
}

export default App;
