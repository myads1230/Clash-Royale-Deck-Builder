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
                style={{ 
                  position: 'relative',
                  padding: 0,
                  overflow: 'hidden',
                  width: '60px',
                  height: '72px'
                }}
              >
                {/* Full-size card image */}
                <img 
                  src={card.image} 
                  alt={card.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />
                
                {/* Elixir drop overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    width: '16px',
                    height: '20px',
                    background: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)',
                    borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.55rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {card.elixir}
                </div>
                
                {/* Evolution badge */}
                {card.hasEvolution && (
                  <div 
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
                      lineHeight: 1,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
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
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    padding: '8px 2px 3px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ 
                    fontSize: '0.45rem',
                    color: 'white',
                    fontWeight: 500,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {card.name.length > 8 ? card.name.substring(0, 7) + '..' : card.name}
                  </span>
                </div>
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
