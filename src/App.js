import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleGetRepositories();
  }, []);

  async function handleGetRepositories() {
    const response = await api.get("/repositories");
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const newRepo = {
      title: `Projeto 01 ${Date.now()}`,
      url: "https://gostack.com.br",
      techs: ["a", "b"],
    };
    const response = await api.post("/repositories", newRepo);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const oldRepos = [...repositories];
    const repoIndex = oldRepos.findIndex((repo) => repo.id === id);
    if (repoIndex !== -1) {
      oldRepos.splice(repoIndex, 1);
      setRepositories(oldRepos);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
