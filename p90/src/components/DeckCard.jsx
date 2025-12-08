import { cards, typeIcons } from '../data/cards'

function DeckCard({ deck, onClick }) {
  const getWinRateClass = (winRate) => {
    if (winRate >= 52) return 'high'
    if (winRate >= 48) return 'medium'
    return 'low'
  }

  return (
    <div className="deck-item" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="deck-item-header">
        <h3 className="deck-item-title">{deck.name}</h3>
        {deck.archetype && (
          <span className="deck-item-archetype">{deck.archetype}</span>
        )}
      </div>
      <div className="deck-item-body">
        <div className="deck-item-cards">
          {deck.cards.map((cardId, index) => {
            const card = cards.find(c => c.id === cardId)
            if (!card) return null
            
            const rarityClass = `rarity-${card.rarity.toLowerCase()}`
            
            return (
              <div 
                key={index} 
                className={`deck-item-card ${rarityClass}`}
                title={card.name}
              >
                <span className="elixir">{card.elixir}</span>
                <span style={{ fontSize: '1.25rem' }}>{typeIcons[card.type] || '⚔️'}</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                  {card.name.length > 8 ? card.name.substring(0, 6) + '..' : card.name}
                </span>
              </div>
            )
          })}
        </div>
        
        <div className="deck-item-stats">
          {deck.avgElixir && (
            <div className="deck-stat">
              <span className="deck-stat-value text-gold">
                💧 {typeof deck.avgElixir === 'number' ? deck.avgElixir.toFixed(1) : deck.avgElixir}
              </span>
              <span className="deck-stat-label">Avg Elixir</span>
            </div>
          )}
          {deck.winRate && (
            <div className="deck-stat">
              <span className={`deck-stat-value win-rate-badge ${getWinRateClass(deck.winRate)}`}>
                {deck.winRate}%
              </span>
              <span className="deck-stat-label">Win Rate</span>
            </div>
          )}
          {deck.usage && (
            <div className="deck-stat">
              <span className="deck-stat-value text-blue">{deck.usage}%</span>
              <span className="deck-stat-label">Usage</span>
            </div>
          )}
          {deck.wins && (
            <div className="deck-stat">
              <span className="deck-stat-value">{deck.wins.toLocaleString()}</span>
              <span className="deck-stat-label">Wins</span>
            </div>
          )}
        </div>

        {deck.description && (
          <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.875rem' }}>
            {deck.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default DeckCard
