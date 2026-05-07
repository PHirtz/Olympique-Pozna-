export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('matches', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    team_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    opponent_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    match_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    is_home: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    competition: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('scheduled', 'in_progress', 'finished', 'cancelled', 'postponed'),
      allowNull: false,
      defaultValue: 'scheduled'
    },
    score_home: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    score_away: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    match_report: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    match_report_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  await queryInterface.addIndex('matches', ['team_id']);
  await queryInterface.addIndex('matches', ['match_date']);
  await queryInterface.addIndex('matches', ['status']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('matches');
};