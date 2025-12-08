import { useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { cards, rarityColors, typeIcons } from '../data/cards'
import { decksByCard } from '../data/decks'
import DeckCard from '../components/DeckCard'

function CardDecks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRarity, setFilterRarity] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [selectedCard, setSelectedCard] = useState(null)

  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary', 'Champion']
  const types = ['All', 'Troop', 'Spell', 'Building']

  // Cards that have decks associated with them
  const featuredCardIds = Object.keys(decksByCard).map(Number)
  
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = filterRarity === 'All' || card.rarity === filterRarity
      const matchesType = filterType === 'All' || card.type === filterType
      return matchesSearch && matchesRarity && matchesType
    })
  }, [searchTerm, filterRarity, filterType])

  const selectedCardData = selectedCard ? cards.find(c => c.id === selectedCard) : null
  const selectedCardDecks = selectedCard ? (decksByCard[selectedCard] || []) : []

  return (
    <div className="page-container">
      <Container>
        {/* Header */}
        <div className="section-header mb-5">
          <h1>🃏 Decks by Card</h1>
          <p className="section-subtitle">
            Find the best decks featuring your favorite cards
          </p>
        </div>

        <Row>
          {/* Card Selection */}
          <Col lg={5} className="mb-4">
            <div className="cr-card" style={{ position: 'sticky', top: '100px' }}>
              <div className="cr-card-header">
                <h3 className="mb-0" style={{ fontSize: '1.1rem' }}>Select a Card</h3>
              </div>
              <div className="cr-card-body">
                {/* Search */}
                <div className="search-wrapper mb-3">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search cards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Rarity Filter */}
                <div className="filter-pills mb-2">
                  {rarities.map(rarity => (
                    <button
                      key={rarity}
                      className={`filter-pill ${filterRarity === rarity ? 'active' : ''}`}
                      onClick={() => setFilterRarity(rarity)}
                      style={rarity !== 'All' && filterRarity === rarity ? {
                        background: rarityColors[rarity]?.gradient,
                        fontSize: '0.75rem',
                        padding: '0.35rem 0.75rem'
                      } : { fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>

                {/* Type Filter */}
                <div className="filter-pills">
                  {types.map(type => (
                    <button
                      key={type}
                      className={`filter-pill ${filterType === type ? 'active' : ''}`}
                      onClick={() => setFilterType(type)}
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      {type !== 'All' && typeIcons[type]} {type}
                    </button>
                  ))}
                </div>

                {/* Card Grid */}
                <div className="card-grid" style={{ maxHeight: '350px' }}>
                  {filteredCards.map(card => {
                    const rarityClass = `rarity-${card.rarity.toLowerCase()}`
                    const hasFeaturedDecks = featuredCardIds.includes(card.id)
                    
                    return (
                      <div
                        key={card.id}
                        className={`card-grid-item ${rarityClass} ${selectedCard === card.id ? 'selected' : ''}`}
                        onClick={() => setSelectedCard(card.id)}
                        style={{
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                      >
                        <span className="card-elixir">{card.elixir}</span>
                        <span className="card-icon">{typeIcons[card.type] || '⚔️'}</span>
                        <span className="card-name">{card.name}</span>
                        {hasFeaturedDecks && (
                          <span 
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              fontSize: '0.6rem'
                            }}
                          >
                            ⭐
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <p className="text-muted text-center mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
                  ⭐ Cards with featured decks
                </p>
              </div>
            </div>
          </Col>

          {/* Decks Display */}
          <Col lg={7}>
            {selectedCardData ? (
              <>
                {/* Selected Card Info */}
                <div className="cr-card mb-4">
                  <div className="cr-card-body">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className={`rarity-${selectedCardData.rarity.toLowerCase()}`}
                        style={{
                          width: '80px',
                          height: '96px',
                          background: 'var(--gradient-card)',
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '3px solid'
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>{typeIcons[selectedCardData.type] || '⚔️'}</span>
                      </div>
                      <div>
                        <h2 className="mb-1">{selectedCardData.name}</h2>
                        <div className="d-flex gap-2 flex-wrap">
                          <span className="elixir-badge">{selectedCardData.elixir}</span>
                          <span 
                            className="filter-pill active mb-0"
                            style={{ 
                              background: rarityColors[selectedCardData.rarity]?.gradient,
                              cursor: 'default'
                            }}
                          >
                            {selectedCardData.rarity}
                          </span>
                          <span className="filter-pill" style={{ cursor: 'default' }}>
                            {typeIcons[selectedCardData.type]} {selectedCardData.type}
                          </span>
                        </div>
                        <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.875rem' }}>
                          Arena: {selectedCardData.arena}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decks featuring this card */}
                <h3 className="mb-3">
                  Best Decks with {selectedCardData.name}
                  <span className="text-muted ms-2" style={{ fontSize: '1rem' }}>
                    ({selectedCardDecks.length} decks)
                  </span>
                </h3>

                {selectedCardDecks.length > 0 ? (
                  <div className="deck-list">
                    {selectedCardDecks.map((deck, index) => (
                      <div 
                        key={deck.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <DeckCard deck={deck} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cr-card text-center py-5">
                    <span style={{ fontSize: '3rem' }}>📋</span>
                    <h4 className="mt-3">No featured decks yet</h4>
                    <p className="text-muted">
                      Check out our <a href="/deck-builder" className="footer-link">Deck Builder</a> to create your own deck with {selectedCardData.name}!
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="cr-card text-center py-5">
                <span style={{ fontSize: '4rem' }}>👈</span>
                <h3 className="mt-3">Select a Card</h3>
                <p className="text-muted">
                  Choose a card from the list to see the best decks featuring it
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CardDecks
