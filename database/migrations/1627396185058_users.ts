import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('flag').notNullable().defaultTo('client')
      table.timestamps()
    })

    this.schema.alterTable('transactions', (table) => {
      table.foreign('sender_id').references('users.id')
      table.foreign('receiver_id').references('users.id')
    })
  }

  public async down() {
    this.schema.alterTable('transactions', (table) => {
      table.dropForeign('sender_id')
      table.dropForeign('receiver_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
