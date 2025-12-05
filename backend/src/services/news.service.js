import News from '../models/news.model.js';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import { Op } from 'sequelize';

class NewsService {
  async createNews(newsData) {
    const news = await News.create(newsData);
    return await this.getNewsById(news.id);
  }

  async getAllNews(filters = {}) {
    const { status, category, teamId, authorId, isPinned, startDate, endDate, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (teamId) where.teamId = teamId;
    if (authorId) where.authorId = authorId;
    if (isPinned !== undefined) where.isPinned = isPinned;
    
    if (startDate || endDate) {
      where.publishedAt = {};
      if (startDate) where.publishedAt[Op.gte] = new Date(startDate);
      if (endDate) where.publishedAt[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await News.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl', 'category']
        }
      ],
      limit,
      offset,
      order: [
        ['isPinned', 'DESC'],
        ['publishedAt', 'DESC']
      ]
    });

    return {
      news: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getNewsById(id) {
    const news = await News.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl', 'category']
        }
      ]
    });

    if (!news) {
      throw new Error('Article introuvable');
    }

    return news;
  }

  async getNewsBySlug(slug) {
    const news = await News.findOne({
      where: { slug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl', 'category']
        }
      ]
    });

    if (!news) {
      throw new Error('Article introuvable');
    }

    return news;
  }

  async updateNews(id, updateData) {
    const news = await News.findByPk(id);
    
    if (!news) {
      throw new Error('Article introuvable');
    }

    await news.update(updateData);
    return await this.getNewsById(id);
  }

  async deleteNews(id) {
    const news = await News.findByPk(id);
    
    if (!news) {
      throw new Error('Article introuvable');
    }

    await news.destroy();
    return { message: 'Article supprimé avec succès' };
  }

  async publishNews(id) {
    const news = await News.findByPk(id);
    
    if (!news) {
      throw new Error('Article introuvable');
    }

    await news.update({
      status: 'published',
      publishedAt: new Date()
    });

    return await this.getNewsById(id);
  }

  async getPublishedNews(filters = {}) {
    const { category, teamId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {
      status: 'published',
      publishedAt: { [Op.lte]: new Date() }
    };

    if (category) where.category = category;
    if (teamId) where.teamId = teamId;

    const { count, rows } = await News.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl']
        }
      ],
      limit,
      offset,
      order: [
        ['isPinned', 'DESC'],
        ['publishedAt', 'DESC']
      ]
    });

    return {
      news: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getLatestNews(limit = 5) {
    return await News.findAll({
      where: {
        status: 'published',
        publishedAt: { [Op.lte]: new Date() }
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl']
        }
      ],
      limit,
      order: [['publishedAt', 'DESC']]
    });
  }
}

export default new NewsService();