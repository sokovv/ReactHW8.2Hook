import { useState, useEffect } from "react";
import "./App.css";

function useJsonFetch(url, opts = 1) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data)
        if (data.status !== "ok") {
          setError(true);
        }
      });
  }, [url, opts]);

  return [data, loading, error];
}

function DataFetch() {
  console.log("render data");
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data", 2);
  console.log(error);
  return (
    <>
      <h3>Data</h3>
      <div>
        {(error && "Ошибка...") || (loading ? "Загрузка..." : data.status)}
      </div>
    </>
  );
}

function LoadingFetch() {
  console.log("render loading");
  const [data, loading, error] = useJsonFetch(
    "http://localhost:7070/loading",
    2
  );
  console.log(error);
  return (
    <>
      <h3>Loading</h3>
      <div>
        {(error && "Ошибка...") || (loading ? "Загрузка..." : data.status)}
      </div>
    </>
  );
}

function ErrorFetch() {
  console.log("render error");
  const [data, loading, error] = useJsonFetch("http://localhost:7070/error", 2);
  console.log(error);
  return (
    <>
      <h3>Error</h3>
      <div>
        {(error && "Ошибка...") || (loading ? "Загрузка..." : data.status)}
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <DataFetch></DataFetch>
      <LoadingFetch></LoadingFetch>
      <ErrorFetch></ErrorFetch>
    </>
  );
}

export default App;
