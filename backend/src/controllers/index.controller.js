import teamService from '../services/team.service.js';
import matchService from '../services/match.service.js';
import newsService from '../services/news.service.js';
import { productService, eventService, galleryService, partnerService, statisticsService } from '../services/others.service.js';

// TEAM CONTROLLER
class TeamController {
  async create(req, res) {
    try {
      const team = await teamService.createTeam(req.body);
      res.status(201).json({ success: true, message: 'Équipe créée avec succès', data: team });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await teamService.getAllTeams(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const team = await teamService.getTeamById(req.params.id);
      res.status(200).json({ success: true, data: team });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getBySlug(req, res) {
    try {
      const team = await teamService.getTeamBySlug(req.params.slug);
      res.status(200).json({ success: true, data: team });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const team = await teamService.updateTeam(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Équipe mise à jour avec succès', data: team });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await teamService.deleteTeam(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

// MATCH CONTROLLER
class MatchController {
  async create(req, res) {
    try {
      const match = await matchService.createMatch(req.body);
      res.status(201).json({ success: true, message: 'Match créé avec succès', data: match });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await matchService.getAllMatches(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const match = await matchService.getMatchById(req.params.id);
      res.status(200).json({ success: true, data: match });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const match = await matchService.updateMatch(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Match mis à jour avec succès', data: match });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await matchService.deleteMatch(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUpcoming(req, res) {
    try {
      const matches = await matchService.getUpcomingMatches(req.query.teamId, req.query.limit);
      res.status(200).json({ success: true, data: matches });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPast(req, res) {
    try {
      const matches = await matchService.getPastMatches(req.query.teamId, req.query.limit);
      res.status(200).json({ success: true, data: matches });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// NEWS CONTROLLER
class NewsController {
  async create(req, res) {
    try {
      const news = await newsService.createNews(req.body);
      res.status(201).json({ success: true, message: 'Article créé avec succès', data: news });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await newsService.getAllNews(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const news = await newsService.getNewsById(req.params.id);
      res.status(200).json({ success: true, data: news });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getBySlug(req, res) {
    try {
      const news = await newsService.getNewsBySlug(req.params.slug);
      res.status(200).json({ success: true, data: news });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const news = await newsService.updateNews(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Article mis à jour avec succès', data: news });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await newsService.deleteNews(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async publish(req, res) {
    try {
      const news = await newsService.publishNews(req.params.id);
      res.status(200).json({ success: true, message: 'Article publié avec succès', data: news });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getPublished(req, res) {
    try {
      const result = await newsService.getPublishedNews(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getLatest(req, res) {
    try {
      const news = await newsService.getLatestNews(req.query.limit);
      res.status(200).json({ success: true, data: news });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// PRODUCT CONTROLLER
class ProductController {
  async create(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ success: true, message: 'Produit créé avec succès', data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await productService.getAllProducts(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Produit mis à jour avec succès', data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

// EVENT CONTROLLER
class EventController {
  async create(req, res) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json({ success: true, message: 'Événement créé avec succès', data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await eventService.getAllEvents(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Événement mis à jour avec succès', data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await eventService.deleteEvent(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUpcoming(req, res) {
    try {
      const events = await eventService.getUpcomingEvents(req.query.limit);
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// GALLERY CONTROLLER
class GalleryController {
  async create(req, res) {
    try {
      const gallery = await galleryService.createGallery(req.body);
      res.status(201).json({ success: true, message: 'Photo ajoutée avec succès', data: gallery });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await galleryService.getAllGallery(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const gallery = await galleryService.getGalleryById(req.params.id);
      res.status(200).json({ success: true, data: gallery });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const gallery = await galleryService.updateGallery(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Photo mise à jour avec succès', data: gallery });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await galleryService.deleteGallery(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getAlbums(req, res) {
    try {
      const albums = await galleryService.getAlbums();
      res.status(200).json({ success: true, data: albums });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// PARTNER CONTROLLER
class PartnerController {
  async create(req, res) {
    try {
      const partner = await partnerService.createPartner(req.body);
      res.status(201).json({ success: true, message: 'Partenaire créé avec succès', data: partner });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await partnerService.getAllPartners(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const partner = await partnerService.getPartnerById(req.params.id);
      res.status(200).json({ success: true, data: partner });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const partner = await partnerService.updatePartner(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Partenaire mis à jour avec succès', data: partner });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await partnerService.deletePartner(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

// STATISTICS CONTROLLER
class StatisticsController {
  async create(req, res) {
    try {
      const stats = await statisticsService.createStatistics(req.body);
      res.status(201).json({ success: true, message: 'Statistiques créées avec succès', data: stats });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await statisticsService.getAllStatistics(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const stats = await statisticsService.getStatisticsById(req.params.id);
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const stats = await statisticsService.updateStatistics(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Statistiques mises à jour avec succès', data: stats });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await statisticsService.deleteStatistics(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getTopScorers(req, res) {
    try {
      const topScorers = await statisticsService.getTopScorers(req.query.season, req.query.limit);
      res.status(200).json({ success: true, data: topScorers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const teamController = new TeamController();
export const matchController = new MatchController();
export const newsController = new NewsController();
export const productController = new ProductController();
export const eventController = new EventController();
export const galleryController = new GalleryController();
export const partnerController = new PartnerController();
export const statisticsController = new StatisticsController();