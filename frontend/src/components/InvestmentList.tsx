import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Investment {
  id: string;
  type: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  purchaseDate: string;
}

function InvestmentList() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    loadInvestments();
  }, [typeFilter]);

  const loadInvestments = async () => {
    try {
      const data = await api(`/investments${typeFilter ? `?type=${typeFilter}` : ""}`);
      setInvestments(data);
    } catch (error) {
      console.error("Erro ao carregar investimentos", error);
    }
  };

  const handleUpdatePrice = async (id: string) => {
    try {
      await api(`/investments/${id}/market-price`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPrice: parseFloat(newPrice) }),
      });

      alert("Preço atualizado com sucesso!");
      setEditingId(null);
      setNewPrice("");
      loadInvestments();
    } catch (err) {
      alert("Erro ao atualizar preço");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Minha Carteira</h2>

      <div className="mb-3">
        <select className="form-select" onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="ACAO">Ação</option>
          <option value="CRIPTO">Cripto</option>
          <option value="FUNDO">Fundo</option>
          <option value="RENDA_FIXA">Renda Fixa</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Tipo</th>
            <th>Ativo</th>
            <th>Quantidade</th>
            <th>Preço de Compra</th>
            <th>Preço Atual</th>
            <th>Data da Compra</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.type}</td>
              <td>{inv.symbol}</td>
              <td>{inv.quantity}</td>
              <td>R$ {inv.purchasePrice.toFixed(2)}</td>
              <td>{inv.currentPrice ? `R$ ${inv.currentPrice.toFixed(2)}` : "-"}</td>
              <td>{new Date(inv.purchaseDate).toLocaleDateString()}</td>
              <td>
                {editingId === inv.id ? (
                  <div className="d-flex gap-1">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Novo preço"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleUpdatePrice(inv.id)}
                    >
                      Salvar
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setEditingId(inv.id)}
                  >
                    Atualizar Preço
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvestmentList;
