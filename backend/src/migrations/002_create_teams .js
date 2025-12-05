export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('teams', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    name_pl: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    category: {
      type: Sequelize.ENUM('senior', 'u19', 'u17', 'u15', 'u13', 'u11', 'u9', 'u7'),
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('male', 'female', 'mixed'),
      allowNull: false,
      defaultValue: 'male'
    },
    season: {
      type: Sequelize.STRING(20),
      allowNull: false
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
      allowNull: true
    },
    image_path: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    coach_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    is_active: {
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

  await queryInterface.addIndex('teams', ['category']);
  await queryInterface.addIndex('teams', ['season']);
  await queryInterface.addIndex('teams', ['coach_id']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('teams');
};