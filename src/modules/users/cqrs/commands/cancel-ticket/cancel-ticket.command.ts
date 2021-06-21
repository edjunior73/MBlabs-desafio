export class CancelTicketCommand {
  constructor(public readonly ticketId: string, public readonly userId: string) {}
}
