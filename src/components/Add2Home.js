import React, { useState, useEffect } from "react";
// Thanks to Nico Martin: https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/A2H.jsx

const Add2Home = () => {
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    // tämä estää normaalin asennuskyselyn
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  if (!prompt) {
    return '';
  }

  return (
      <button className="nappi" onClick={() => prompt.prompt() /* laukaistaan asennuskysely napinpainalluksella */}
      >Asenna</button>
  );
};

export default Add2Home;