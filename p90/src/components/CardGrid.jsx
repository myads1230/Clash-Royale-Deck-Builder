import { useState, useMemo } from 'react'
import { cards, rarityColors, getCardType } from '../data/cards'

function CardGrid({ onCardSelect, selectedCards = [], maxCards = 8 }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRarity, setFilterRarity] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [showEvolutionsOnly, setShowEvolutionsOnly] = useState(false)

  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary', 'Champion']
  const types = ['All', 'Troop', 'Spell', 'Building']

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = filterRarity === 'All' || card.rarity === filterRarity
      const cardType = getCardType(card)
      const matchesType = filterType === 'All' || cardType === filterType
      const matchesEvolution = !showEvolutionsOnly || card.hasEvolution
      return matchesSearch && matchesRarity && matchesType && matchesEvolution
    })
  }, [searchTerm, filterRarity, filterType, showEvolutionsOnly])

  const handleCardClick = (card) => {
    if (selectedCards.includes(card.id)) {
      return
    }
    if (selectedCards.length >= maxCards) {
      return
    }
    onCardSelect(card.id)
  }

  return (
    <div>
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

      {/* Rarity Filters */}
      <div className="filter-pills">
        {rarities.map(rarity => (
          <button
            key={rarity}
            className={`filter-pill ${filterRarity === rarity ? 'active' : ''}`}
            onClick={() => setFilterRarity(rarity)}
            style={rarity !== 'All' && filterRarity === rarity ? {
              background: rarityColors[rarity]?.gradient
            } : {}}
          >
            {rarity}
          </button>
        ))}
      </div>

      {/* Type Filters */}
      <div className="filter-pills">
        {types.map(type => (
          <button
            key={type}
            className={`filter-pill ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type === 'Troop' && '⚔️'} 
            {type === 'Spell' && '✨'} 
            {type === 'Building' && '🏰'} 
            {type}
          </button>
        ))}
        <button
          className={`filter-pill ${showEvolutionsOnly ? 'active' : ''}`}
          onClick={() => setShowEvolutionsOnly(!showEvolutionsOnly)}
          style={showEvolutionsOnly ? { 
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            color: '#000'
          } : {}}
        >
          🧬 Evolutions
        </button>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {filteredCards.map(card => {
          const isSelected = selectedCards.includes(card.id)
          const rarityClass = `rarity-${card.rarity.toLowerCase()}`
          
          return (
            <div
              key={card.id}
              className={`card-grid-item ${rarityClass} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCardClick(card)}
              style={{
                opacity: isSelected ? 0.5 : 1,
                cursor: isSelected || selectedCards.length >= maxCards ? 'not-allowed' : 'pointer'
              }}
            >
              {/* Full-size card image */}
              <img 
                src={card.image} 
                alt={card.name}
                loading="lazy"
              />
              
              {/* Elixir drop overlay */}
              <div 
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  width: '18px',
                  height: '22px',
                  background: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)',
                  borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  zIndex: 2
                }}
              >
                {card.elixir}
              </div>
              
              {/* Evolution badge */}
              {card.hasEvolution && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '3px',
                    right: '3px',
                    fontSize: '0.4rem',
                    background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
                    color: '#000',
                    borderRadius: '3px',
                    padding: '2px 3px',
                    fontWeight: 700,
                    lineHeight: 1,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    zIndex: 2
                  }}
                >
                  EVO
                </div>
              )}
              
              {/* Card name overlay */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  padding: '12px 3px 3px',
                  textAlign: 'center',
                  zIndex: 1
                }}
              >
                <span style={{ 
                  fontSize: '0.5rem',
                  color: 'white',
                  fontWeight: 600,
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {card.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-4 text-muted">
          No cards found matching your filters
        </div>
      )}
      
      <p className="text-muted text-center mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
        {filteredCards.length} cards found
      </p>
    </div>
  )
}

export default CardGrid
