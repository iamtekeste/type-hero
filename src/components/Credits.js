import React from 'react';

export default function Credits() {
  return (
    <div className="credits">
      <div className="me">
        <p>
          made by <a href="https://twitter.com/iamtekeste">@iamtekeste</a>
        </p>
        <a
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet?url=https://typehero.now.sh/&text=Try Google fonts on beautiful backgrounds & colors&via=iamtekeste"
        >
          Tweet
        </a>
        <a className="twitter-follow-button" href="https://twitter.com/iamtekeste" data-show-screen-name="false" data-show-count="false">Follow @iamtekeste</a>
      </div>
      <p>Search powered by <a href="https://www.algolia.com/">Algolia</a></p>
    </div>
  );
}
