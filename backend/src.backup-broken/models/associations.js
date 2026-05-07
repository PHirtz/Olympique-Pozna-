import User from './user.model.js';
import Team from './team.model.js';
import Match from './match.model.js';
import News from './news.model.js';
import Product from './product.model.js';
import Event from './event.model.js';
import Gallery from './gallery.model.js';
import Partner from './partner.model.js';
import Statistics from './statistics.model.js';
import Camp from './camp.model.js';
import CampRegistration from './camp-registration.model.js';

// User - Team (joueurs)
User.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });
Team.hasMany(User, { foreignKey: 'teamId', as: 'players' });

// User - Team (coach)
Team.belongsTo(User, { foreignKey: 'coachId', as: 'coach' });
User.hasMany(Team, { foreignKey: 'coachId', as: 'coachedTeams' });

// Team - Match
Team.hasMany(Match, { foreignKey: 'teamId', as: 'matches' });
Match.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// User - News (auteur)
User.hasMany(News, { foreignKey: 'authorId', as: 'articles' });
News.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Team - News
Team.hasMany(News, { foreignKey: 'teamId', as: 'news' });
News.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// Team - Event
Team.hasMany(Event, { foreignKey: 'teamId', as: 'events' });
Event.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// Gallery - Event
Event.hasMany(Gallery, { foreignKey: 'eventId', as: 'photos' });
Gallery.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Gallery - Match
Match.hasMany(Gallery, { foreignKey: 'matchId', as: 'photos' });
Gallery.belongsTo(Match, { foreignKey: 'matchId', as: 'match' });

// Gallery - Team
Team.hasMany(Gallery, { foreignKey: 'teamId', as: 'photos' });
Gallery.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// User - Gallery (uploader)
User.hasMany(Gallery, { foreignKey: 'uploadedBy', as: 'uploadedPhotos' });
Gallery.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

// User - Statistics
User.hasMany(Statistics, { foreignKey: 'userId', as: 'statistics' });
Statistics.belongsTo(User, { foreignKey: 'userId', as: 'player' });

// Camp - CampRegistration
Camp.hasMany(CampRegistration, { foreignKey: 'campId', as: 'registrations' });
CampRegistration.belongsTo(Camp, { foreignKey: 'campId', as: 'camp' });

export {
  User,
  Team,
  Match,
  News,
  Product,
  Event,
  Gallery,
  Partner,
  Statistics,
  Camp,
  CampRegistration
};