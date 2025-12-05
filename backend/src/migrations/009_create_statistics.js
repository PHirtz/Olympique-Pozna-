export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('statistics', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    season: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    matches_played: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    assists: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    yellow_cards: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    red_cards: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minutes_played: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
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

  await queryInterface.addIndex('statistics', ['user_id', 'season'], {
    unique: true,
    name: 'statistics_user_season_unique'
  });
  await queryInterface.addIndex('statistics', ['season']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('statistics');
};