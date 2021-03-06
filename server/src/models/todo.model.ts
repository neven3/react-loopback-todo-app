import {Entity, model, property} from '@loopback/repository';

@model()
export class Todo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'Date',
    default: new Date()
  })
  dateCreated?: Date;

  @property({
    type: 'Date'
  })
  dateUpdated?: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  isComplete?: boolean;


  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
