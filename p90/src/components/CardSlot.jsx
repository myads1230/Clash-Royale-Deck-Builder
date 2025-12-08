import { cards, typeIcons } from '../data/cards'

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
  const icon = typeIcons[card.type] || '⚔️'

  const sizeStyles = {
    small: { width: '50px', height: '60px', fontSize: '0.5rem' },
    medium: {},
    large: { width: '80px', height: '96px' }
  }

  return (
    <div 
      className={`deck-card-slot ${rarityClass}`}
      onClick={onClick}
      style={sizeStyles[size]}
      title={`${card.name} - ${card.elixir} Elixir`}
    >
      <span className="card-elixir" style={size === 'small' ? { width: '14px', height: '14px', fontSize: '0.55rem' } : {}}>
        {card.elixir}
      </span>
      <span style={{ fontSize: size === 'small' ? '1.25rem' : size === 'large' ? '2rem' : '1.5rem' }}>
        {icon}
      </span>
      {showDetails && (
        <span className="card-name" style={{ 
          fontSize: size === 'small' ? '0.5rem' : '0.6rem',
          marginTop: '2px'
        }}>
          {card.name}
        </span>
      )}
    </div>
  )
}

export default CardSlot
