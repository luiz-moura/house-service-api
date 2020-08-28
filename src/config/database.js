module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'houseservice',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
