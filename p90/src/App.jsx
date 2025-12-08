import { Routes, Route } from 'react-router'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import TopDecks from './pages/TopDecks'
import CardDecks from './pages/CardDecks'
import DeckBuilder from './pages/DeckBuilder'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-decks" element={<TopDecks />} />
          <Route path="/card-decks" element={<CardDecks />} />
          <Route path="/deck-builder" element={<DeckBuilder />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
