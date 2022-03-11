import React, { ChangeEvent, useState } from "react";
import "./App.css";

function linearSearch(array: Array<number>, target: number) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === target) {
      return index;
    }
  }
  return -1;
}

function binarySearch(array: Array<number>, target: number) {
  let begin: number = 0;
  let end: number = array.length - 1;
  let middle: number;
  while (end >= 1) {
    middle = begin + Math.floor((begin + end) / 2);
    if (middle === target) {
      return middle;
    } else if (middle > target) {
      end = middle - 1;
    } else {
      begin = middle + 1;
    }
  }
  return -1;
}

function App() {
  // States
  const [fileContent, setFileContent] = useState<String | null>(null);
  const [target, setTarget] = useState("");

  // Read .txt file
  const readFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent?.target?.result;
        if (typeof textFromFileLoaded === "string") setFileContent(textFromFileLoaded);
      };
      fileReader.readAsText(file, "UTF-8");
    } else {
      setFileContent(null);
    }
  };

  const postData = (method: string) => {
    if (!fileContent) {
      alert("Suba un archivo .txt con los valores");
      return;
    }
    const array = fileContent.split(",").map((value) => parseInt(value));

    // Validate if target is number
    const targetInt = parseInt(target);
    if (isNaN(targetInt)) {
      alert("El valor a encontrar debe ser un entero");
      return;
    }

    // Post body data
    const data = {
      method,
      array,
      target: targetInt,
    };

    // Request options
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send POST request
    // TODO: Write endpoint url
    fetch("localhost", options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <h1 className="font-semibold text-4xl text-center my-5">Práctica 1</h1>
      <div>
        <span className="font-medium mx-5">Archivo:</span>
        <input type="file" accept=".txt" onChange={readFile} />
      </div>
      {fileContent ? (
        <div className="mt-5">
          <span className="font-medium mx-5">Valores dentro del archivo:</span>
          <span>{fileContent}</span>
        </div>
      ) : (
        <></>
      )}
      <div>
        <span className="font-medium mx-5">Valor a encontrar:</span>
        <input
          type="text"
          placeholder="Número"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="py-2 px-4 rounded border border-gray-400 text-gray-700 focus:outline-blue-500 my-5"
        />
      </div>
      <div className="flex flex-row justify-between sm:w-1/2 md:w-1/4 mx-auto">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
          onClick={() => postData("linear")}
        >
          Búsqueda Lineal
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
          onClick={() => postData("binary")}
        >
          Búsqueda Binaria
        </button>
      </div>
    </div>
  );
}

export default App;
