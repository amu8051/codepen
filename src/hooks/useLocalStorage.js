import React, { useState, useEffect } from 'react';

const PREFIX = 'codepen-clone-';
const initialHtml = `<body>
      <h1>
        This is a <a href="https://codepen.io/pen/">CodePen</a>
        Clone.
      </h1>
      <h2>Edit the above code to start practicing</h2>
      <ul>
        Features:
        <li>Live Code Editing</li>
        <li>Debouncing to eliminate unnecessary renders</li>
        <li>Caching, to avoid loosing data on refresh</li>
        <li>Minimize/Maximize code editors.</li>
      </ul>
</body>`;
const initialCss = `body{
  font-family: consolas;
  margin-left: 1.5rem;
}`;
const initialJs = `document.body.style.background = 'yellow' `;

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    } else {
      switch (key) {
        case 'html':
          return initialHtml;
        case 'css':
          return initialCss;
        case 'js':
          return initialJs;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
}
