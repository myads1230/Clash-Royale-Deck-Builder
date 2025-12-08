import CardSlot from './CardSlot'
import { cards } from '../data/cards'

function DeckDisplay({ cardIds, onCardClick, editable = false }) {
  // Calculate average elixir
  const avgElixir = cardIds.length > 0
    ? (cardIds.reduce((sum, id) => {
        const card = cards.find(c => c.id === id)
        return sum + (card?.elixir || 0)
      }, 0) / cardIds.length).toFixed(1)
    : '0.0'

  // Fill with empty slots if less than 8 cards
  const displayCards = [...cardIds]
  while (displayCards.length < 8) {
    displayCards.push(null)
  }

  return (
    <div className="deck-display-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="elixir-badge">
          {avgElixir} Avg
        </span>
        <span className="text-muted" style={{ fontSize: '0.875rem' }}>
          {cardIds.length}/8 cards
        </span>
      </div>
      <div className="deck-display">
        {displayCards.map((cardId, index) => (
          <CardSlot
            key={index}
            cardId={cardId}
            onClick={() => editable && onCardClick && onCardClick(index, cardId)}
            showDetails={true}
          />
        ))}
      </div>
    </div>
  )
}

export default DeckDisplay
