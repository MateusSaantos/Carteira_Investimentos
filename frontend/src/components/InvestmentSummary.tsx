import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Summary {
  totalInvested: number;
  totalByType: {
    [key: string]: number;
  };
  assetCount: number;
}

function InvestmentSummary() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await api("/investments/summary");
      setSummary(data);
    } catch (err) {
      console.error("Erro ao carregar resumo", err);
    }
  };

  if (!summary) return <p>Carregando resumo...</p>;

  return (
    <div className="container">
      <h2>Resumo da Carteira</h2>
      <p><strong>Total Investido:</strong> R$ {summary.totalInvested.toFixed(2)}</p>
      <p><strong>Quantidade de Ativos:</strong> {summary.assetCount}</p>

      <h4 className="mt-4">Total por Tipo:</h4>
      <ul>
        {Object.entries(summary.totalByType).map(([type, total]) => (
          <li key={type}><strong>{type}:</strong> R$ {total.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default InvestmentSummary;
