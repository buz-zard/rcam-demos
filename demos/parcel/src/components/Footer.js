import React from 'react';

function Footer() {
  return (
    <footer className="bg-grey-light">
      <div className="container mx-auto text-center text-grey-darker py-4 px-5 sm:py-8">
        Copyright ©{' '}
        <a
          href="https://karolis.sh/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Karolis Šarapnickis
        </a>
        , {new Date().getFullYear()}. MIT Licensed. A{' '}
        <a
          href="https://www.npmjs.com/package/redux-cached-api-middleware"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          redux-cached-api-middleware
        </a>{' '}
        demo application -{' '}
        <a
          href="https://github.com/buz-zard/rcam-demos"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          source code
        </a>
        .
      </div>
    </footer>
  );
}

export default Footer;
