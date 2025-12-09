import { cards } from '../data/cards'

function CardSlot({ cardId, onClick, showDetails = false, size = 'medium' }) {
  const card = cards.find(c => c.id === cardId)
  
  if (!card) {
    return (
      <div 
        className={`deck-card-slot empty ${size === 'small' ? 'small-slot' : ''}`}
        onClick={onClick}
        style={size === 'small' ? { width: '50px', height: '60px' } : {}}
      >
        <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>+</span>
      </div>
    )
  }

  const rarityClass = `rarity-${card.rarity.toLowerCase()}`

  const sizeStyles = {
    small: { width: '50px', height: '60px' },
    medium: { width: '70px', height: '84px' },
    large: { width: '90px', height: '108px' }
  }

  const elixirSizes = {
    small: { width: '16px', height: '20px', fontSize: '0.6rem' },
    medium: { width: '22px', height: '28px', fontSize: '0.75rem' },
    large: { width: '28px', height: '35px', fontSize: '0.9rem' }
  }

  return (
    <div 
      className={`deck-card-slot ${rarityClass}`}
      onClick={onClick}
      style={{
        ...sizeStyles[size],
        padding: 0,
        overflow: 'hidden',
        position: 'relative'
      }}
      title={`${card.name} - ${card.elixir} Elixir`}
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
          top: '3px',
          left: '3px',
          ...elixirSizes[size],
          background: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)',
          borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
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
            top: '3px',
            right: '3px',
            fontSize: size === 'small' ? '0.45rem' : '0.55rem',
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            color: '#000',
            borderRadius: '3px',
            padding: '2px 4px',
            fontWeight: 700,
            lineHeight: 1,
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        >
          EVO
        </div>
      )}
      
      {/* Card name overlay (if showDetails) */}
      {showDetails && (
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: '8px 4px 4px',
            textAlign: 'center'
          }}
        >
          <span style={{ 
            fontSize: size === 'small' ? '0.45rem' : '0.55rem',
            color: 'white',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}>
            {card.name}
          </span>
        </div>
      )}
    </div>
  )
}

export default CardSlot
