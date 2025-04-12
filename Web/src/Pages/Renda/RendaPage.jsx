import React, { useState } from "react";
import "./renda.css";

function Renda() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("montante");

  const addEntry = () => {
    if (description && value && type) {
      const date = new Date().toLocaleDateString();
      setEntries([...entries, { description, value: parseFloat(value), type, date }]);
      setDescription("");
      setValue("");
    }
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const calculateBalance = () => {
    return entries.reduce(
      (total, entry) => total + (entry.type === "montante" ? entry.value : -entry.value),
      0
    );
  };

  return (
    <div className="app-container">
      <div className="renda-quadro">
        <h1>Controle de Dívidas e Rendimentos</h1>

        <div className="form">
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="montante">Montante</option>
            <option value="divida">Dívida</option>
          </select>
          <button onClick={addEntry}>Adicionar</button>
        </div>

        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index} className="entry">
              <div>
                <strong>{entry.description}</strong>
                <span className="date">({entry.date})</span>
              </div>
              <div>
                R$ {entry.value.toFixed(2)}
                <button className="edit-button">Editar</button>
                <button className="remove-button" onClick={() => removeEntry(index)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="balance">Saldo disponível: R$ {calculateBalance().toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Renda;