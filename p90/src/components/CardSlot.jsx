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
    medium: {},
    large: { width: '80px', height: '96px' }
  }

  const imageSizes = {
    small: '36px',
    medium: '50px',
    large: '65px'
  }

  return (
    <div 
      className={`deck-card-slot ${rarityClass}`}
      onClick={onClick}
      style={sizeStyles[size]}
      title={`${card.name} - ${card.elixir} Elixir`}
    >
      <span 
        className="card-elixir" 
        style={size === 'small' ? { width: '14px', height: '14px', fontSize: '0.55rem' } : {}}
      >
        {card.elixir}
      </span>
      
      {/* Evolution badge */}
      {card.hasEvolution && (
        <span 
          className="evolution-badge"
          style={{
            position: 'absolute',
            top: size === 'small' ? '2px' : '4px',
            right: size === 'small' ? '2px' : '4px',
            fontSize: size === 'small' ? '0.5rem' : '0.6rem',
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            color: '#000',
            borderRadius: '3px',
            padding: '1px 3px',
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
          width: imageSizes[size], 
          height: imageSizes[size], 
          objectFit: 'contain' 
        }}
        loading="lazy"
      />
      
      {showDetails && (
        <span className="card-name" style={{ 
          fontSize: size === 'small' ? '0.5rem' : '0.55rem',
          marginTop: '2px',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {card.name}
        </span>
      )}
    </div>
  )
}

export default CardSlot
