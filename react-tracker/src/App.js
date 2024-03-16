import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import RankPage from './pages/RankPage';
import EloChart from './pages/EloChart';

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/user/:user" element={<EloChart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}