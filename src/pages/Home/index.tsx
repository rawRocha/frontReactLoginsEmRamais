import './style.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import Loading from '../../components/Loading/Loading';

//Modais
import ModalLogin from '../../components/Modal/ModalLogin';
import ModalCadastroRange from '../../components/Modal/ModalCadastroRange';
import ModalCreateExtension from '../../components/Modal/ModalCreateExtension';
import ModalRegister from '../../components/Modal/ModalRegister';

//types
import { Ramal } from '../../types/ramalTypes';

//services
import {
  fetchAvailableExtensions,
  loginToExtension,
  createRange,
  createExtension,
  register,
  searchExtensions,
  logoutToExtension,
  configureRange,
  resetRange,
} from '../../services/extensionService';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //estados para busca
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  //estados para manipulação de ramais
  const [ramais, setRamais] = useState<Ramal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  // estados para manipulação de Modais
  const [showModal, setShowModal] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [mode, setMode] = useState('login');
  const [showModalCadastroRange, setShowModalCadastroRange] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [createRangeError, setCreateRangeError] = useState(null);
  const [showModalCreateExtension, setShowModalCreateExtension] =
    useState(false);
  const [extensionNumber, setExtensionNumber] = useState('');
  const [createExtensionError, setCreateExtensionError] = useState(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [registerError, setRegisterError] = useState(null);

  // Carregar ramais por página
  const fetchRamais = async (currentPage = 0) => {
    setLoading(true);
    try {
      const data = await fetchAvailableExtensions(currentPage, 8);
      if (currentPage === 0) {
        setRamais(data.content); // Primeira página: substitui
      } else {
        setRamais(prev => [...prev, ...data.content]); // Demais: adiciona
      }
      setLastPage(data.last);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função de busca
  const handleSearch = async (term, currentPage = 0) => {
    if (!term.trim()) {
      setSearchResults([]);
      fetchRamais(currentPage); // Se termo vazio, volta para lista normal
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchExtensions(term, currentPage, 8);
      setSearchResults(data.content);
      setLastPage(data.last);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para evitar muitas chamadas enquanto digita
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchTerm, page);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, page]);

  //carregar mais
  const loadMore = e => {
    e.preventDefault();
    if (!lastPage && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  //carregar menos
  const loadLess = e => {
    e.preventDefault();
    if (page > 0 && !loading) {
      setPage(prevPage => prevPage - 1);
    }
  };

  //criar range
  const handleCreateRangeSubmit = async e => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await createRange({ start, end });
        toast.success('Range de ramais criado com sucesso!');
      } else {
        await configureRange({ start, end }); // Nova função no service!
        toast.success('Range configurado com sucesso!');
      }
      setShowModalCadastroRange(false);
      setPage(0); // Recarrega a lista
      fetchRamais(page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao processar');
      setCreateRangeError(err.response?.data?.message || 'Erro ao processar');
    }
  };

  const handleResetRange = async () => {
    try {
      await resetRange();
      toast.success('Range resetado com sucesso!');
      fetchRamais(); // Recarrega a lista
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao resetar range');
    }
  };

  //criar extensão und
  const handleCreateExtensionSubmit = async e => {
    e.preventDefault();
    try {
      await createExtension({ extensionNumber });
      toast.success('Ramal criado com sucesso!');
      setShowModalCreateExtension(false);
      setPage(0); // Resetando página para recarregar
    } catch (err) {
      toast.error(err.response.data.message);
      setCreateExtensionError(err.response.data.message);
    }
  };

  //dispara a chamada do modal login
  const handleLoginClick = ramal => {
    setSelectedExtension(ramal.extensionNumber);
    setUsername('');
    setPassword('');
    setLoginError(null);

    //reaproveitando o modal login para logout
    if (ramal.loggedUser?.username) {
      //modo logout
      setShowModal(true);
      setMode('logout');
    } else {
      //Modo login
      setShowModal(true);
      setMode('login');
    }
  };

  //abrir modal cadastro de usuário
  const handleOpenRegister = () => {
    setShowModal(false);
    setShowModalRegister(true);
  };

  //logar ou deslogar depende do estado do ramal se tem ou não usuário.
  const handleLoginSubmit = async e => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await loginToExtension({
          username,
          password,
          extensionNumber: selectedExtension,
        });
        toast.success('Login realizado com sucesso!');
        dispatch(setUserInfo({ username, extension: selectedExtension }));
        navigate('/logados');
      } else {
        await logoutToExtension({
          username,
          password,
          extensionNumber: selectedExtension,
        });
        toast.success('Logout realizado com sucesso!');
        setSearchTerm('');
      }

      setShowModal(false);
      setPage(0);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao processar');
      setLoginError(err.response?.data?.message || 'Erro ao processar');
    }
  };

  const handleRegisterSubmit = async e => {
    e.preventDefault();

    try {
      await register({
        username: usernameRegister,
        password: passwordRegister,
      });
      toast.success('Cadastro realizado com sucesso!');
      setShowModalRegister(false);
      setShowModal(true);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoginError(err.response.data.message);
    }
  };

  const uniqueRamais = ramais.filter(
    (ramal, index, self) => index === self.findIndex(r => r.id === ramal.id)
  );

  if (loading && ramais.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">❌ Erro: {error}</div>;
  }

  const filteredRamais = uniqueRamais.filter(ramal =>
    ramal.extensionNumber.toString().includes(searchTerm)
  );

  return (
    <>
      <main>
        <section>
          <div className="container">
            <h1>Lista de Ramais disponíveis</h1>
            <input
              type="text"
              placeholder="Buscar ramal ou usuário..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(0); // Resetar página ao mudar o termo de busca
              }}
              className="search-input"
            />
            <br />
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setMode('create');
                setShowModalCadastroRange(true);
              }}
            >
              Cadastrar nova range de ramais
            </a>
            <br />
            <br />
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setShowModalCreateExtension(true);
              }}
            >
              Cadastrar novo ramal
            </a>
            <br />
            <br />
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setMode('configure'); // Define o modo como "configure"
                setShowModalCadastroRange(true);
              }}
            >
              Configurar range de ramais
            </a>
            <br />
            <br />
            <button onClick={handleResetRange} className="reset-range-btn">
              Resetar Range
            </button>
            {(searchTerm ? searchResults : uniqueRamais).length === 0 ? (
              <p style={{ fontSize: 30, marginTop: 30 }}>
                {searchTerm
                  ? 'Ramal não encontrado'
                  : 'Lista de ramais está vazia.'}
              </p>
            ) : (
              <table className="ramais-table">
                <thead>
                  <tr>
                    <th>Ramal</th>
                    <th>ID</th>
                    <th>Usuário Logado</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {(searchTerm ? searchResults : uniqueRamais).map(ramal => (
                    <tr key={ramal.id}>
                      <td>{ramal.extensionNumber}</td>
                      <td>{ramal.id}</td>
                      <td>{ramal.loggedUser?.username || ''}</td>
                      <td
                        className={
                          ramal.status === 'DISPONIVEL'
                            ? 'status-disponivel'
                            : ramal.status === 'INVALIDO'
                              ? 'status-invalido'
                              : 'status-ocupado'
                        }
                      >
                        {ramal.status === 'DISPONIVEL'
                          ? 'Disponível'
                          : ramal.status === 'INVALIDO'
                            ? 'Inativo'
                            : 'Ocupado'}
                      </td>
                      <td>
                        <button onClick={() => handleLoginClick(ramal)}>
                          {ramal.loggedUser?.username ? 'Logout' : 'Login'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="load-more-or-less">
              {!lastPage ? (
                <button
                  className="load-more"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : <FaArrowDown size={25} />}
                </button>
              ) : null}
              {page !== 0 ? (
                <button
                  className="load-less"
                  onClick={loadLess}
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : <FaArrowUp size={25} />}
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      {/* props de modal login */}
      <ModalLogin
        showModal={showModal}
        selectedExtension={selectedExtension}
        username={username}
        password={password}
        loginError={loginError}
        setUsername={setUsername}
        setPassword={setPassword}
        setLoginError={setLoginError}
        handleLoginSubmit={handleLoginSubmit}
        setShowModal={setShowModal}
        handleOpenRegister={handleOpenRegister}
        mode={mode}
      />
      {/* props de cadastro range ramais modal */}
      <ModalCadastroRange
        showModalCadastroRange={showModalCadastroRange}
        setShowModalCadastroRange={setShowModalCadastroRange}
        createRangeError={createRangeError}
        setCreateRangeError={setCreateRangeError}
        handleCreateRangeSubmit={handleCreateRangeSubmit}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        mode={mode}
      />
      {/* props de criar um ramal modal */}
      <ModalCreateExtension
        showModalCreateExtension={showModalCreateExtension}
        setShowModalCreateExtension={setShowModalCreateExtension}
        createExtensionError={createExtensionError}
        setCreateExtensionError={setCreateExtensionError}
        handleCreateExtensionSubmit={handleCreateExtensionSubmit}
        extensionNumber={extensionNumber}
        setExtensionNumber={setExtensionNumber}
      />
      {/* props de cadastro usuário modal */}
      <ModalRegister
        showModalRegister={showModalRegister}
        usernameRegister={usernameRegister}
        passwordRegister={passwordRegister}
        registerError={registerError}
        setUsernameRegister={setUsernameRegister}
        setPasswordRegister={setPasswordRegister}
        setRegisterError={setRegisterError}
        handleRegisterSubmit={handleRegisterSubmit}
        setShowModalRegister={setShowModalRegister}
      />
    </>
  );
};
