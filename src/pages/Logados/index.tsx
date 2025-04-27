import './style.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import SearchInput from '../../components/SearchInput/SearchInput';
import Loading from '../../components/Loading/Loading';

//Modais
import ModalLogin from '../../components/Modal/ModalLogin';
import ModalRegister from '../../components/Modal/ModalRegister';

//types
import { Ramal, LoggedUser } from '../../types/ramalTypes';

import {
  fetchUnvailableExtensions,
  logoutToExtension,
  register,
} from '../../services/extensionService';
import { toast } from 'react-toastify';

export const Logados = () => {
  const navigate = useNavigate();

  const [ramais, setRamais] = useState<Ramal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRamais, setFilteredRamais] = useState<Ramal[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  //estados para controlar o modal e os dados do form
  const [showModal, setShowModal] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  //função para fetch ramais ocupados
  const fetchRamais = async () => {
    setLoading(true);
    try {
      const data = await fetchUnvailableExtensions();
      setRamais(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFilter = (term: string) => {
    if (!term.trim()) {
      setIsFiltering(false);
      return;
    }

    const lower = term.toLowerCase();
    const results = ramais.filter(
      r =>
        r.extensionNumber.toString().includes(lower) ||
        r.loggedUser?.username?.toLowerCase().includes(lower)
    );

    setFilteredRamais(results);
    setIsFiltering(true);
  };

  //função para abrir o modal com o ramal selecionado
  const handleLoginClick = extensionNumber => {
    setSelectedExtension(extensionNumber);
    setShowModal(true);
    setUsername('');
    setPassword('');
    setLoginError(null);
  };

  const handleOpenRegister = () => {
    setShowModal(false);
    setShowModalRegister(true);
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
      toast.error(err.response?.data?.message || 'Erro ao cadastrar!');
      setRegisterError(err.response?.data?.message || 'Erro ao cadastrar!');
    }
  };

  //função para enviar o logout via login
  const handleLoginSubmit = async e => {
    e.preventDefault();

    try {
      await logoutToExtension({
        username,
        password,
        extensionNumber: selectedExtension,
      });

      toast.success('Logout realizado com sucesso!');
      setShowModal(false);
      navigate('/');
      await fetchRamais();
    } catch (err) {
      toast.error(err.response.data.message);
      setLoginError(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchRamais();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">❌ Erro: {error}</div>;
  }

  return (
    <>
      <main>
        <section>
          <div className="container">
            <h1>Lista de Ramais ocupados</h1>

            <SearchInput onSearch={handleSearchFilter} resetPage={() => {}} />

            <button style={{ marginTop: '15px' }} onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: '8px' }} />
            </button>

            <div className="table-wrapper">
              {(isFiltering ? filteredRamais : ramais).length === 0 ? (
                <p style={{ fontSize: 30, marginTop: 30 }}>
                  {isFiltering
                    ? 'Ramal não encontrado em OCUPADOS'
                    : 'Nenhum ramal ocupado.'}
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
                    {(isFiltering ? filteredRamais : ramais).map(
                      (ramal, index) => (
                        <tr key={index}>
                          <td>{ramal.extensionNumber}</td>
                          <td>{ramal.id}</td>
                          <td>{ramal.loggedUser?.username || 'Nenhum'}</td>
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
                            <button
                              onClick={() =>
                                handleLoginClick(ramal.extensionNumber)
                              }
                            >
                              Logout
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </main>
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
        mode="logout"
      />
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
