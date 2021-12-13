
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('user', function(table) {
        table.string('firstName');
        table.string('lastName');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user', function(table) {
        table.dropColumn('firstName');
        table.dropColumn('lastName');
    });
};
