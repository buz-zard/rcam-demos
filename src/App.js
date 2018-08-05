import React from 'react';

function App() {
  return (
    <div>
      <header>
        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.reload(true);
          }}
        >
          Restart app
        </button>
      </header>
      <p>
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
