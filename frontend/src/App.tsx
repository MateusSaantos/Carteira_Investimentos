import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InvestmentList from "./components/InvestmentList";
import CreateInvestment from "./components/CreateInvestment";
import InvestmentSummary from "./components/InvestmentSummary";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <header className="mb-4">
          <h1 className="text-center">Carteira de Investimentos</h1>
          <nav className="d-flex justify-content-center gap-3 mt-3">
            <Link className="btn btn-outline-primary" to="/">Carteira</Link>
            <Link className="btn btn-outline-success" to="/create">Adicionar</Link>
            <Link className="btn btn-outline-info" to="/summary">Resumo</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<InvestmentList />} />
            <Route path="/create" element={<CreateInvestment />} />
            <Route path="/summary" element={<InvestmentSummary />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
