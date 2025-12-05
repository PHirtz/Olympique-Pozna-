export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('camp_registrations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    camp_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'camps',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    // Participant
    child_first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    child_last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    child_date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    child_gender: {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: false
    },
    // Parent
    parent_first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    parent_last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    parent_email: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    parent_phone: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    // Adresse
    address: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    postal_code: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: 'Pologne'
    },
    // Médical
    medical_info: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    emergency_contact: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    emergency_phone: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    // Sport
    sport_level: {
      type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false
    },
    previous_experience: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    // Divers
    dietary_restrictions: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    special_needs: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    // Statut
    status: {
      type: Sequelize.ENUM('pending', 'confirmed', 'paid', 'cancelled', 'waiting_list'),
      allowNull: false,
      defaultValue: 'pending'
    },
    payment_status: {
      type: Sequelize.ENUM('pending', 'partial', 'completed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    payment_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    payment_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    // Consentements
    terms_accepted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    gdpr_consent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    photo_consent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // Métadonnées
    registration_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    confirmation_token: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true
    },
    confirmed_at: {
      type: Sequelize.DATE,
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

  await queryInterface.addIndex('camp_registrations', ['camp_id']);
  await queryInterface.addIndex('camp_registrations', ['parent_email']);
  await queryInterface.addIndex('camp_registrations', ['status']);
  await queryInterface.addIndex('camp_registrations', ['confirmation_token']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('camp_registrations');
};