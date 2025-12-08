import { useState, useMemo } from 'react'
import { cards, rarityColors, typeIcons } from '../data/cards'

function CardGrid({ onCardSelect, selectedCards = [], maxCards = 8 }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRarity, setFilterRarity] = useState('All')
  const [filterType, setFilterType] = useState('All')

  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary', 'Champion']
  const types = ['All', 'Troop', 'Spell', 'Building']

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = filterRarity === 'All' || card.rarity === filterRarity
      const matchesType = filterType === 'All' || card.type === filterType
      return matchesSearch && matchesRarity && matchesType
    })
  }, [searchTerm, filterRarity, filterType])

  const handleCardClick = (card) => {
    if (selectedCards.includes(card.id)) {
      return // Already selected
    }
    if (selectedCards.length >= maxCards) {
      return // Max cards reached
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
            {type !== 'All' && typeIcons[type]} {type}
          </button>
        ))}
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
              <span className="card-elixir">{card.elixir}</span>
              <span className="card-icon">{typeIcons[card.type] || '⚔️'}</span>
              <span className="card-name">{card.name}</span>
            </div>
          )
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-4 text-muted">
          No cards found matching your filters
        </div>
      )}
    </div>
  )
}

export default CardGrid
