export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('gallery', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    title_pl: {
      type: Sequelize.STRING(150),
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
    image_url: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    image_path: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    album_name: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    event_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    match_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'matches',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
    uploaded_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    is_public: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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

  await queryInterface.addIndex('gallery', ['event_id']);
  await queryInterface.addIndex('gallery', ['match_id']);
  await queryInterface.addIndex('gallery', ['team_id']);
  await queryInterface.addIndex('gallery', ['uploaded_by']);
  await queryInterface.addIndex('gallery', ['album_name']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('gallery');
};