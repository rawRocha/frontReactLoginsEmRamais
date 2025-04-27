import React from 'react';

const ModalCadastroRange = ({
  showModalCadastroRange,
  start,
  end,
  createRangeError,
  setStart,
  setEnd,
  setCreateRangeError,
  handleCreateRangeSubmit,
  setShowModalCadastroRange,
  mode = 'create', // "create" (padrão) ou "configure"
}) => {
  if (!showModalCadastroRange) return null;

  const title =
    mode === 'create'
      ? 'Cadastrar novo range de ramais'
      : 'Configurar range válido de ramais';

  const submitButtonText = mode === 'create' ? 'Criar' : 'Salvar';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <form onSubmit={handleCreateRangeSubmit}>
          <label>
            Início:
            <input
              type="number"
              value={start}
              onChange={e => {
                setStart(e.target.value);
                setCreateRangeError(null);
              }}
              required
            />
          </label>
          <label>
            Fim:
            <input
              type="number"
              value={end}
              onChange={e => {
                setEnd(e.target.value);
                setCreateRangeError(null);
              }}
              required
            />
          </label>
          {createRangeError && <p className="error">{createRangeError}</p>}
          <div className="modal-buttons">
            <button type="submit">{submitButtonText}</button>
            <button
              type="button"
              onClick={() => setShowModalCadastroRange(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroRange;
