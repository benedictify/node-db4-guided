
exports.up = async function(knex) {
  await knex.schema
    .createTable('zoos', table => {
      table.increments('zoo_id')
      table.string('zoo_name', 128).notNullable()
      table.string('zoo_address', 256).notNullable().unique()
    })
    .createTable('species', table => {
      table.increments('species_id')
      table.string('species_name', 128).notNullable()
    })
    .createTable('animals', table => {
      table.increments('animal_id')
      table.string('animal_name', 128).notNullable()
      table.integer('species_id')
        .unsigned()
        .notNullable()
        .references('species_id')
        .inTable('species')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT') // CHANGE OF PK -- NEVER HAPPENS
    })
    .createTable('zoo_animals', table => {
      table.increments('zoo_animal_id')
    })
}

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
}
