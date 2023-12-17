import { useState } from "react";
import { Header } from "../../components/Header";
import ItemList from "../../components/ItemList";
import background from "../../assets/background.png";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [CurrentUser, setCurrentUser] = useState(null);
  const [Repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <input
            name="usuario"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="@username"
          />
          <button onClick={handleGetData}>Buscar</button>
          {CurrentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={CurrentUser.avatar_url}
                  className="profile"
                  alt="imagem de perfil"
                />
                <div>
                  <h3>{CurrentUser.name}</h3>
                  <span>@{CurrentUser.login}</span>
                  <p>{CurrentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}

          {Repos?.length ? (
            <div>
              <h4>Repositório</h4>
              {Repos.map((repo) => (
                <ItemList title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
