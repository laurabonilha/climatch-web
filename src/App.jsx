import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { EventosListPage } from "./features/eventos/EventosListPage";
import { NovoEventoPage } from "./features/eventos/NovoEventoPage";
import { SugestoesDataListPage } from "./features/sugestoes-data/SugestoesDataListPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/eventos" replace />} />
        <Route path="eventos" element={<EventosListPage />} />
        <Route path="eventos/novo" element={<NovoEventoPage />} />
        <Route path="sugestoes-data" element={<SugestoesDataListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
