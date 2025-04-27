import React from 'react';

const ModalCreateExtension = ({
  showModalCreateExtension,
  extensionNumber,
  createExtensionError,
  setExtensionNumber,
  setCreateExtensionError,
  handleCreateExtensionSubmit,
  setShowModalCreateExtension,
}) => {
  if (!showModalCreateExtension) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cadastro de ramal</h2>
        <br />
        <form onSubmit={handleCreateExtensionSubmit}>
          <label>
            Número:
            <input
              type="number"
              value={extensionNumber}
              onChange={e => {
                setExtensionNumber(e.target.value);
                setCreateExtensionError(null);
              }}
              required
            />
          </label>

          {createExtensionError && (
            <p className="error">{createExtensionError}</p>
          )}
          <br />
          <br />
          <button type="submit">Criar</button>
          <button
            type="button"
            onClick={() => setShowModalCreateExtension(false)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateExtension;
