export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('events', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    title_pl: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    description_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    event_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    location: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    location_pl: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    type: {
      type: Sequelize.ENUM('training', 'tournament', 'social', 'meeting', 'other'),
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    image_path: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    team_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    max_participants: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    registration_required: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: Sequelize.ENUM('upcoming', 'ongoing', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'upcoming'
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

  await queryInterface.addIndex('events', ['event_date']);
  await queryInterface.addIndex('events', ['team_id']);
  await queryInterface.addIndex('events', ['status']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('events');
};