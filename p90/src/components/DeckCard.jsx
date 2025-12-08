import { cards } from '../data/cards'

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
                style={{ position: 'relative' }}
              >
                <span className="elixir">{card.elixir}</span>
                
                {/* Evolution badge */}
                {card.hasEvolution && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      fontSize: '0.4rem',
                      background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
                      color: '#000',
                      borderRadius: '2px',
                      padding: '1px 2px',
                      fontWeight: 700,
                      lineHeight: 1
                    }}
                  >
                    EVO
                  </span>
                )}
                
                <img 
                  src={card.image} 
                  alt={card.name}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    objectFit: 'contain'
                  }}
                  loading="lazy"
                />
                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: '2px' }}>
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
