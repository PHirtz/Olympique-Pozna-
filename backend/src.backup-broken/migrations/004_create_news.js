export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('news', {
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
    slug: {
      type: Sequelize.STRING(250),
      allowNull: false,
      unique: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    content_pl: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    excerpt: {
      type: Sequelize.STRING(300),
      allowNull: true
    },
    excerpt_pl: {
      type: Sequelize.STRING(300),
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
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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
    category: {
      type: Sequelize.ENUM('match_report', 'event', 'announcement', 'general'),
      allowNull: false,
      defaultValue: 'general'
    },
    published_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft'
    },
    is_pinned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

  await queryInterface.addIndex('news', ['slug']);
  await queryInterface.addIndex('news', ['author_id']);
  await queryInterface.addIndex('news', ['team_id']);
  await queryInterface.addIndex('news', ['status']);
  await queryInterface.addIndex('news', ['published_at']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('news');
};