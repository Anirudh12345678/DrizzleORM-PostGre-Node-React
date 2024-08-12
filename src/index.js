import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./AddUser.js";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import EditUser from './EditUser.js';
import CreateArticle from './CreateArticle.js';
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path="/addUser" element={<AddUser/>}/>
      <Route path="/editUser/:id" element={<EditUser/>}/>
      <Route path="/createArticle/:id" element={<CreateArticle/>}/>
    </Routes>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
