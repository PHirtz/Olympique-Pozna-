export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('partners', {
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
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    description_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    logo_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    logo_path: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    website_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    category: {
      type: Sequelize.ENUM('main_sponsor', 'official_partner', 'supplier', 'media_partner'),
      allowNull: false,
      defaultValue: 'official_partner'
    },
    display_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
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

  await queryInterface.addIndex('partners', ['category']);
  await queryInterface.addIndex('partners', ['display_order']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('partners');
};