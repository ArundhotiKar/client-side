import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';

// Updates document.title based on the deepest matched route that provides a `handle.title`.
// `handle.title` can be a string or a function that receives the match object.
const TitleUpdater = ({ defaultTitle = 'PawMart' }) => {
  const matches = useMatches();

  useEffect(() => {
    if (!matches) return;

    // Search from deepest match to shallowest for a title
    const found = [...matches].reverse().find((m) => m.handle && m.handle.title);

    let title = defaultTitle;
    if (found) {
      const t = found.handle.title;
      if (typeof t === 'function') {
        try {
          title = t(found) || defaultTitle;
        } catch (err) {
          // fallback
          title = defaultTitle;
        }
      } else if (typeof t === 'string') {
        title = t;
      }
    }

    document.title = title;
  }, [matches, defaultTitle]);

  return null;
};

export default TitleUpdater;
