import Product from '../models/product.model.js';
import Event from '../models/event.model.js';
import Gallery from '../models/gallery.model.js';
import Partner from '../models/partner.model.js';
import Statistics from '../models/statistics.model.js';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';
import { Op } from 'sequelize';

// PRODUCT SERVICE
class ProductService {
  async createProduct(productData) {
    return await Product.create(productData);
  }

  async getAllProducts(filters = {}) {
    const { category, isAvailable, minPrice, maxPrice, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (isAvailable !== undefined) where.isAvailable = isAvailable;
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      products: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');
    await product.update(updateData);
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');
    await product.destroy();
    return { message: 'Produit supprimé avec succès' };
  }
}

// EVENT SERVICE
class EventService {
  async createEvent(eventData) {
    const event = await Event.create(eventData);
    return await this.getEventById(event.id);
  }

  async getAllEvents(filters = {}) {
    const { type, status, teamId, startDate, endDate, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (teamId) where.teamId = teamId;
    
    if (startDate || endDate) {
      where.eventDate = {};
      if (startDate) where.eventDate[Op.gte] = new Date(startDate);
      if (endDate) where.eventDate[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await Event.findAndCountAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      limit,
      offset,
      order: [['eventDate', 'DESC']]
    });

    return {
      events: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getEventById(id) {
    const event = await Event.findByPk(id, {
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }]
    });
    if (!event) throw new Error('Événement introuvable');
    return event;
  }

  async updateEvent(id, updateData) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error('Événement introuvable');
    await event.update(updateData);
    return await this.getEventById(id);
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error('Événement introuvable');
    await event.destroy();
    return { message: 'Événement supprimé avec succès' };
  }

  async getUpcomingEvents(limit = 10) {
    return await Event.findAll({
      where: {
        eventDate: { [Op.gte]: new Date() },
        status: { [Op.in]: ['upcoming', 'ongoing'] }
      },
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl']
      }],
      limit,
      order: [['eventDate', 'ASC']]
    });
  }
}

// GALLERY SERVICE
class GalleryService {
  async createGallery(galleryData) {
    const gallery = await Gallery.create(galleryData);
    return await this.getGalleryById(gallery.id);
  }

  async getAllGallery(filters = {}) {
    const { albumName, eventId, matchId, teamId, isPublic, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (albumName) where.albumName = albumName;
    if (eventId) where.eventId = eventId;
    if (matchId) where.matchId = matchId;
    if (teamId) where.teamId = teamId;
    if (isPublic !== undefined) where.isPublic = isPublic;

    const { count, rows } = await Gallery.findAndCountAll({
      where,
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'title', 'titlePl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      gallery: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getGalleryById(id) {
    const gallery = await Gallery.findByPk(id, {
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'title', 'titlePl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });
    if (!gallery) throw new Error('Photo introuvable');
    return gallery;
  }

  async updateGallery(id, updateData) {
    const gallery = await Gallery.findByPk(id);
    if (!gallery) throw new Error('Photo introuvable');
    await gallery.update(updateData);
    return await this.getGalleryById(id);
  }

  async deleteGallery(id) {
    const gallery = await Gallery.findByPk(id);
    if (!gallery) throw new Error('Photo introuvable');
    await gallery.destroy();
    return { message: 'Photo supprimée avec succès' };
  }

  async getAlbums() {
    const albums = await Gallery.findAll({
      attributes: ['albumName'],
      where: { albumName: { [Op.ne]: null } },
      group: ['albumName'],
      raw: true
    });
    return albums.map(a => a.albumName);
  }
}

// PARTNER SERVICE
class PartnerService {
  async createPartner(partnerData) {
    return await Partner.create(partnerData);
  }

  async getAllPartners(filters = {}) {
    console.log('🔍 getAllPartners appelé avec:', filters);
    const { category, isActive, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive;
    
    console.log('🔍 WHERE:', where);
    
    const { count, rows } = await Partner.findAndCountAll({
      where,
      limit,
      offset,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']]
    });
    
    return {
      partners: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getPartnerById(id) {
    const partner = await Partner.findByPk(id);
    if (!partner) throw new Error('Partenaire introuvable');
    return partner;
  }

  async updatePartner(id, updateData) {
    const partner = await Partner.findByPk(id);
    if (!partner) throw new Error('Partenaire introuvable');
    await partner.update(updateData);
    return partner;
  }

  async deletePartner(id) {
    const partner = await Partner.findByPk(id);
    if (!partner) throw new Error('Partenaire introuvable');
    await partner.destroy();
    return { message: 'Partenaire supprimé avec succès' };
  }
}

// STATISTICS SERVICE
class StatisticsService {
  async createStatistics(statsData) {
    return await Statistics.create(statsData);
  }

  async getAllStatistics(filters = {}) {
    const { userId, season, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (userId) where.userId = userId;
    if (season) where.season = season;

    const { count, rows } = await Statistics.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'firstName', 'lastName', 'playerNumber', 'position']
      }],
      limit,
      offset,
      order: [['season', 'DESC']]
    });

    return {
      statistics: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getStatisticsById(id) {
    const stats = await Statistics.findByPk(id, {
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'firstName', 'lastName', 'playerNumber', 'position']
      }]
    });
    if (!stats) throw new Error('Statistiques introuvables');
    return stats;
  }

  async getStatisticsByUserAndSeason(userId, season) {
    return await Statistics.findOne({
      where: { userId, season },
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'firstName', 'lastName', 'playerNumber', 'position']
      }]
    });
  }

  async updateStatistics(id, updateData) {
    const stats = await Statistics.findByPk(id);
    if (!stats) throw new Error('Statistiques introuvables');
    await stats.update(updateData);
    return await this.getStatisticsById(id);
  }

  async deleteStatistics(id) {
    const stats = await Statistics.findByPk(id);
    if (!stats) throw new Error('Statistiques introuvables');
    await stats.destroy();
    return { message: 'Statistiques supprimées avec succès' };
  }

  async getTopScorers(season, limit = 10) {
    return await Statistics.findAll({
      where: { season },
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'firstName', 'lastName', 'imageUrl']
      }],
      limit,
      order: [['goals', 'DESC']]
    });
  }
}

export const productService = new ProductService();
export const eventService = new EventService();
export const galleryService = new GalleryService();
export const partnerService = new PartnerService();
export const statisticsService = new StatisticsService();