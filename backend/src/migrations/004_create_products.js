export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    name_pl: {
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
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'EUR'
    },
    category: {
      type: Sequelize.ENUM('jersey', 'clothing', 'accessories', 'equipment', 'other'),
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
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    sizes: {
      type: Sequelize.JSON,
      allowNull: true
    },
    colors: {
      type: Sequelize.JSON,
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

  await queryInterface.addIndex('products', ['category']);
  await queryInterface.addIndex('products', ['is_available']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('products');
};