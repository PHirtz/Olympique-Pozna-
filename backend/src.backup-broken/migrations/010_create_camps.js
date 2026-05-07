export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('camps', {
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
      allowNull: false
    },
    description_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    location_pl: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'EUR'
    },
    age_min: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    age_max: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    max_participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    current_participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    image_path: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    type: {
      type: Sequelize.ENUM('summer', 'winter', 'spring', 'autumn', 'special'),
      allowNull: false,
      defaultValue: 'summer'
    },
    level: {
      type: Sequelize.ENUM('beginner', 'intermediate', 'advanced', 'all'),
      allowNull: false,
      defaultValue: 'all'
    },
    activities: {
      type: Sequelize.JSON,
      allowNull: true
    },
    included_services: {
      type: Sequelize.JSON,
      allowNull: true
    },
    requirements: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    requirements_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    contact_email: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    contact_phone: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    registration_deadline: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('draft', 'open', 'full', 'closed', 'cancelled'),
      allowNull: false,
      defaultValue: 'draft'
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

  await queryInterface.addIndex('camps', ['start_date']);
  await queryInterface.addIndex('camps', ['end_date']);
  await queryInterface.addIndex('camps', ['status']);
  await queryInterface.addIndex('camps', ['type']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('camps');
};