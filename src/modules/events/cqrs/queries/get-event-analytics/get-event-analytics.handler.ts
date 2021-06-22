import { EventRepository, TicketRepository } from '@modules/events/repositories'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { groupByKey } from '@common/utils'
import { GetEventAnalytics } from '@common/models'
import { GetEventAnalyticsQuery } from './get-event-analytics.query'

@QueryHandler(GetEventAnalyticsQuery)
export class GetEventAnalyticsHandler
  implements IQueryHandler<GetEventAnalyticsQuery, GetEventAnalytics>
{
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly ticketRepository: TicketRepository
  ) {}
  async execute({ eventId, eventMakerId }: GetEventAnalyticsQuery) {
    const getEvent = await this.eventRepository.getEventAnalytics(eventId, eventMakerId)
    if (!getEvent) throw new Error('Não há nenhum evento com esse Id')

    const tickets = await this.ticketRepository.findTickets(getEvent[0].id)
    const ticketsMap = tickets.reduce((obj, ticket) => {
      return {
        ...obj,
        [ticket.id]: ticket
      }
    }, {})
    const ticketsUnavailable = tickets.map((ticket, I) => {
      return ticket.id
    })
    const countAvailableTickets = tickets.reduce((total, ticket) => {
      return total + (ticket?.count ?? 0)
    }, 0)

    const boughtTickets = await this.ticketRepository.getBoughtTickets(ticketsUnavailable)
    const unavailableTickets = boughtTickets.length
    const earnedAmount = Object.entries(groupByKey(boughtTickets, 'ticketId')).reduce(
      (total, [ticketId, ticketsArr]) => {
        return total + ticketsMap[ticketId].price * ticketsArr.length
      },
      0
    )
    const totalTickets = unavailableTickets + countAvailableTickets

    return {
      availableTickets: countAvailableTickets,
      unavailableTickets,
      totalTickets,
      earnedAmount
    }
  }
}
