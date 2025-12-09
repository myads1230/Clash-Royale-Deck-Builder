import { cards } from '../data/cards'

function CardSlot({ cardId, onClick, showDetails = false, size = 'medium' }) {
  const card = cards.find(c => c.id === cardId)
  
  const sizeStyles = {
    small: { width: '55px', height: '66px' },
    medium: { width: '75px', height: '90px' },
    large: { width: '95px', height: '114px' }
  }

  const elixirSizes = {
    small: { width: '16px', height: '20px', fontSize: '0.55rem' },
    medium: { width: '22px', height: '28px', fontSize: '0.7rem' },
    large: { width: '26px', height: '32px', fontSize: '0.85rem' }
  }
  
  if (!card) {
    return (
      <div 
        className="deck-card-slot empty"
        onClick={onClick}
        style={sizeStyles[size]}
      >
        <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>+</span>
      </div>
    )
  }

  const rarityClass = `rarity-${card.rarity.toLowerCase()}`

  return (
    <div 
      className={`deck-card-slot ${rarityClass}`}
      onClick={onClick}
      style={sizeStyles[size]}
      title={`${card.name} - ${card.elixir} Elixir`}
    >
      {/* Full-size card image */}
      <img 
        src={card.image} 
        alt={card.name}
        loading="lazy"
      />
      
      {/* Elixir drop overlay */}
      <div 
        className="elixir-drop"
        style={{
          position: 'absolute',
          top: '4px',
          left: '4px',
          ...elixirSizes[size],
          background: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)',
          borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
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
            top: '4px',
            right: '4px',
            fontSize: size === 'small' ? '0.4rem' : '0.5rem',
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            color: '#000',
            borderRadius: '3px',
            padding: '2px 4px',
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
      {showDetails && (
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            padding: '12px 4px 4px',
            textAlign: 'center',
            zIndex: 1
          }}
        >
          <span style={{ 
            fontSize: size === 'small' ? '0.4rem' : '0.5rem',
            color: 'white',
            fontWeight: 600,
            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
          }}>
            {card.name}
          </span>
        </div>
      )}
    </div>
  )
}

export default CardSlot
