export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('admin', 'coach', 'player', 'member'),
      allowNull: false,
      defaultValue: 'member'
    },
    image_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    image_path: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    phone_number: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    nationality: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    player_number: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    position: {
      type: Sequelize.STRING(50),
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
    membership_status: {
      type: Sequelize.ENUM('active', 'inactive', 'pending'),
      allowNull: false,
      defaultValue: 'pending'
    },
    membership_start_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    membership_end_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    preferred_language: {
      type: Sequelize.ENUM('fr', 'pl'),
      allowNull: false,
      defaultValue: 'fr'
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

  await queryInterface.addIndex('users', ['email']);
  await queryInterface.addIndex('users', ['username']);
  await queryInterface.addIndex('users', ['team_id']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('users');
};