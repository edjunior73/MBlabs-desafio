import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Event } from '@common/models'
import { EventRepository } from '@modules/events/repositories'
import { EventMakerRepository } from '@modules/event-makers/repositories'
import { CategoryRepository } from '@modules/categories/repositories'
import { CreateEventCommand } from './create-event.command'

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand, Event> {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventMakerRepository: EventMakerRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute({ input }: CreateEventCommand): Promise<Event> {
    const existsOwner = await this.eventMakerRepository.existsById(input.ownerId)

    if (!existsOwner) throw new Error(`Esse criador de eventos não existe`)

    const existsCategory = await this.categoryRepository.existsById(input.categoryId)

    if (!existsCategory) throw new Error('Essa categoria não existe')

    const findName = await this.eventRepository.findByName(input.name)

    if (findName) throw new Error('Já existe um evento com esse nome!')

    return this.eventRepository.create(input)
  }
}
