import React from 'react';

const ModalRegister = ({
  showModalRegister,
  usernameRegister,
  passwordRegister,
  registerError,
  setUsernameRegister,
  setPasswordRegister,
  setRegisterError,
  handleRegisterSubmit,
  setShowModalRegister,
}) => {
  if (!showModalRegister) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cadastro</h2>
        <br />
        <form onSubmit={handleRegisterSubmit}>
          <label>
            Usuário:
            <input
              type="text"
              value={usernameRegister}
              onChange={e => {
                setUsernameRegister(e.target.value);
                setRegisterError(null);
              }}
              required
            />
          </label>
          <br />
          <label>
            Senha:
            <input
              type="password"
              value={passwordRegister}
              onChange={e => {
                setPasswordRegister(e.target.value);
                setRegisterError(null);
              }}
              required
            />
          </label>
          {registerError && <p className="error">{registerError}</p>}
          <br />
          <br />
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={() => setShowModalRegister(false)}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;
