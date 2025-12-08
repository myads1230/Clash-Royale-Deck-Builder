import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DeckDisplay from '../components/DeckDisplay'
import CardGrid from '../components/CardGrid'
import { cards } from '../data/cards'

function DeckBuilder() {
  const [selectedCards, setSelectedCards] = useState([])
  const [deckName, setDeckName] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCardSelect = useCallback((cardId) => {
    if (selectedCards.length < 8 && !selectedCards.includes(cardId)) {
      setSelectedCards(prev => [...prev, cardId])
    }
  }, [selectedCards])

  const handleCardRemove = useCallback((index, cardId) => {
    if (cardId) {
      setSelectedCards(prev => prev.filter((_, i) => i !== index))
    }
  }, [])

  const handleClearDeck = () => {
    setSelectedCards([])
    setDeckName('')
  }

  const handleRandomDeck = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random())
    const randomCards = shuffled.slice(0, 8).map(c => c.id)
    setSelectedCards(randomCards)
    setDeckName('Random Deck')
  }

  const handleCopyDeck = () => {
    const deckCards = selectedCards.map(id => cards.find(c => c.id === id)?.name).filter(Boolean)
    const deckText = `Deck: ${deckName || 'My Deck'}\nCards: ${deckCards.join(', ')}\nAvg Elixir: ${avgElixir}`
    navigator.clipboard.writeText(deckText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate stats
  const avgElixir = selectedCards.length > 0
    ? (selectedCards.reduce((sum, id) => {
        const card = cards.find(c => c.id === id)
        return sum + (card?.elixir || 0)
      }, 0) / selectedCards.length).toFixed(1)
    : '0.0'

  const cardTypes = selectedCards.reduce((acc, id) => {
    const card = cards.find(c => c.id === id)
    if (card) {
      acc[card.type] = (acc[card.type] || 0) + 1
    }
    return acc
  }, {})

  const rarities = selectedCards.reduce((acc, id) => {
    const card = cards.find(c => c.id === id)
    if (card) {
      acc[card.rarity] = (acc[card.rarity] || 0) + 1
    }
    return acc
  }, {})

  return (
    <div className="page-container">
      <Container>
        {/* Header */}
        <div className="section-header mb-5">
          <h1>🔨 Deck Builder</h1>
          <p className="section-subtitle">
            Create your perfect battle deck with all available cards
          </p>
        </div>

        <div className="deck-builder">
          {/* Left Panel - Deck Display */}
          <div className="deck-builder-panel">
            <div className="mb-4">
              <label className="text-muted mb-2 d-block" style={{ fontSize: '0.875rem' }}>
                Deck Name
              </label>
              <input
                type="text"
                className="search-input"
                placeholder="Enter deck name..."
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                style={{ paddingLeft: '1rem' }}
              />
            </div>

            <DeckDisplay 
              cardIds={selectedCards}
              onCardClick={handleCardRemove}
              editable={true}
            />

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-4 flex-wrap">
              <button 
                className="btn btn-royal flex-grow-1"
                onClick={handleRandomDeck}
              >
                🎲 Random
              </button>
              <button 
                className="btn btn-outline-royal flex-grow-1"
                onClick={handleClearDeck}
                disabled={selectedCards.length === 0}
              >
                🗑️ Clear
              </button>
            </div>

            <button 
              className="btn btn-gold w-100 mt-3"
              onClick={handleCopyDeck}
              disabled={selectedCards.length === 0}
            >
              {copied ? '✅ Copied!' : '📋 Copy Deck'}
            </button>

            {/* Deck Stats */}
            {selectedCards.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-3" style={{ fontSize: '1rem' }}>Deck Analysis</h4>
                
                {/* Card Types */}
                <div className="mb-3">
                  <p className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>CARD TYPES</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {Object.entries(cardTypes).map(([type, count]) => (
                      <span key={type} className="filter-pill" style={{ cursor: 'default' }}>
                        {type}: {count}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rarities */}
                <div>
                  <p className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>RARITIES</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {Object.entries(rarities).map(([rarity, count]) => (
                      <span 
                        key={rarity} 
                        className="filter-pill active"
                        style={{ 
                          cursor: 'default',
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.6rem'
                        }}
                      >
                        {rarity}: {count}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-4 p-3" style={{ 
                  background: 'rgba(255, 215, 0, 0.1)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 215, 0, 0.3)'
                }}>
                  <p className="text-gold mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    💡 Deck Tips
                  </p>
                  <ul className="text-muted mb-0" style={{ fontSize: '0.75rem', paddingLeft: '1rem' }}>
                    {parseFloat(avgElixir) > 4.5 && (
                      <li>High elixir cost - consider adding cheaper cards</li>
                    )}
                    {parseFloat(avgElixir) < 2.8 && (
                      <li>Very low elixir - you might lack defensive options</li>
                    )}
                    {!cardTypes.Spell && (
                      <li>No spells - add at least one spell for versatility</li>
                    )}
                    {cardTypes.Troop && cardTypes.Troop < 4 && (
                      <li>Few troops - consider adding more offensive units</li>
                    )}
                    {selectedCards.length === 8 && (
                      <li className="text-gold">✅ Deck complete! Ready for battle!</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Card Selection */}
          <div className="deck-builder-cards">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0" style={{ fontSize: '1.1rem' }}>Available Cards</h3>
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                Click a card to add it to your deck
              </span>
            </div>
            
            <CardGrid 
              onCardSelect={handleCardSelect}
              selectedCards={selectedCards}
              maxCards={8}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DeckBuilder
