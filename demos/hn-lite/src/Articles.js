import React from 'react';
import PropTypes from 'prop-types';

function Articles({ items }) {
  if (items && items.length) {
    return (
      <div className="articles">
        {items.map(({ url, title, description }) => (
          <a
            href={url}
            key={url}
            className="article"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </a>
        ))}
      </div>
    );
  }
  return <div className="articles">No HN articles found</div>;
}

Articles.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string.isRequired,
    })
  ),
};

export default Articles;
