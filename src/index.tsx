import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//index.tsx será o primeiro arquivo a ser executado pela aplicação.
// - Importa o react
// - Importa o DOM (Document Object Model)

//Método render vai exibir alguma coisa dentro do elemento no HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //   Indo no HTML, procurando pelo elemento com o id 'root' e incluíndo
  // o conteúdo dentro do <app />

  //app é uma importação da função que está no arquivo app.tsx
  document.getElementById('root')

);


