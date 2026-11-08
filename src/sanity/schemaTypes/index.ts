import { type SchemaTypeDefinition } from 'sanity'
import { service } from './services'
import { about } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service , about],
}
