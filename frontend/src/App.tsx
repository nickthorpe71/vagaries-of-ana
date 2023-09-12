import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/hello")
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return <div>{message}</div>;
}

export default App;