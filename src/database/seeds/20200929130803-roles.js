module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'admin',
          display_name: 'Administrador',
        },
        {
          name: 'provider',
          display_name: 'Provedor',
        },
        {
          name: 'client',
          display_name: 'Cliente',
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};
