import React from 'react';

function Header() {
  return (
    <header className="bg-indigo-darker">
      <div className="container mx-auto p-5">
        <div className="inline-flex items-center justify-between w-full">
          <span className="text-white font-mono text-sm pr-4 sm:text-lg">
            redux-cached-api-middleware
          </span>

          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              localStorage.clear();
              window.location.reload(true);
            }}
          >
            Re-fresh
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
