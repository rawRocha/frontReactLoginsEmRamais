import React from 'react';

const ModalLogin = ({
  showModal,
  selectedExtension,
  username,
  password,
  loginError,
  setUsername,
  setPassword,
  setLoginError,
  handleLoginSubmit,
  setShowModal,
  handleOpenRegister,
  mode = 'login',
}) => {
  if (!showModal) return null;

  const isLogin = mode === 'login';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          {isLogin
            ? `Login no Ramal ${selectedExtension}`
            : `Logout no Ramal ${selectedExtension}`}
        </h2>
        <br />
        <form onSubmit={handleLoginSubmit}>
          <label>
            Usuário:
            <input
              type="text"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                setLoginError(null);
              }}
              required
            />
          </label>
          <br />
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setLoginError(null);
              }}
              required
            />
          </label>
          {loginError && <p className="error">{loginError}</p>}
          <br />
          <br />
          <button type="button" onClick={handleOpenRegister}>
            Não possui conta? Cadastre-se.
          </button>
          <br />
          <br />
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
