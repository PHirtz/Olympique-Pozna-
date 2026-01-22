// ==============================================
// SERVICE - PLAYERS (JOUEURS)
// ==============================================

import db from '../database/db.js';
import { 
  HttpNotFoundError, 
  HttpBadRequestError 
} from '../errors/http.errors.js';
import { deleteFile } from '../config/upload.js';

class PlayerService {
  
  // ==============================================
  // RÉCUPÉRER TOUS LES JOUEURS
  // ==============================================
  async getAllPlayers(filters = {}) {
    const { teamId, isActive, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;
    console.log('🔍 Filters reçus dans le service:', filters);

    let whereConditions = [];
    let values = [];

    if (teamId) {
      whereConditions.push('p.team_id = ?');
      values.push(parseInt(teamId, 10));
    }

    if (isActive !== undefined) {
      whereConditions.push('p.is_active = ?');
      values.push(isActive === 'true' ? 1 : 0);
    }

    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ') 
      : '';
    console.log('🔍 WHERE clause:', whereClause);
    console.log('🔍 Values:', values);

    // Récupérer les joueurs
    const players = await db.query(`
      SELECT 
        p.*,
        t.name as teamName,
        t.name_pl as teamNamePl,
        t.category as teamCategory
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ${whereClause}
      ORDER BY t.name, p.last_name, p.first_name
      LIMIT ? OFFSET ?
    `, {
      replacements: [...values, parseInt(limit, 10), parseInt(offset, 10)],
      type: db.QueryTypes.SELECT
    });

    // Compter le total
    const countResult = await db.query(`
      SELECT COUNT(*) as total
      FROM players p
      ${whereClause}
    `, {
      replacements: values,
      type: db.QueryTypes.SELECT
    });

    const total = countResult[0]?.total || 0;
    console.log('🔍 Total compté:', total);
    console.log('🔍 Joueurs retournés:', players.length);

    return {
      players: players.map(player => this.formatPlayer(player)),
      pagination: {
        total: Number(total),
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // ==============================================
  // RÉCUPÉRER UN JOUEUR PAR ID
  // ==============================================
  async getPlayerById(id) {
    const players = await db.query(`
      SELECT 
        p.*,
        t.name as teamName,
        t.name_pl as teamNamePl,
        t.category as teamCategory
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      WHERE p.id = ?
    `, {
      replacements: [id],
      type: db.QueryTypes.SELECT
    });

    if (players.length === 0) {
      throw new HttpNotFoundError('Joueur non trouvé');
    }

    return this.formatPlayer(players[0]);
  }

  // ==============================================
  // CRÉER UN JOUEUR
  // ==============================================
    async createPlayer(playerData, uploadedFile = null) {
    const {
        teamId, firstName, lastName, nickname, jerseyNumber,
        position, positionPl, birthYear, nationality, nationalityPl,
        photoUrl,
        distinction1, distinction2, distinction3, distinction4, distinction5,
        isActive = true
    } = playerData;

    // Déterminer le chemin de la photo
    let photoPath = null;
    
    if (uploadedFile) {
        photoPath = `/uploads/players/${uploadedFile.filename}`;
    } else if (photoUrl && this.isValidUrl(photoUrl)) {
        photoPath = photoUrl;
    }

    const result = await db.query(`
        INSERT INTO players (
        team_id, first_name, last_name, nickname, jersey_number,
        position, position_pl, birth_year, nationality, nationality_pl,
        photo_path, distinction1, distinction2, distinction3, distinction4, distinction5,
        is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, {
        replacements: [
        teamId || null,
        firstName || null,
        lastName || null,
        nickname || null,
        jerseyNumber || null,
        position || null,
        positionPl || null,
        birthYear || null,
        nationality || null,
        nationalityPl || null,
        photoPath,
        distinction1 || null,
        distinction2 || null,
        distinction3 || null,
        distinction4 || null,
        distinction5 || null,
        isActive ? 1 : 0
        ],
        type: db.QueryTypes.INSERT
    });

    return await this.getPlayerById(result[0]);
    }

  // ==============================================
  // MODIFIER UN JOUEUR
  // ==============================================
    async updatePlayer(id, updateData, uploadedFile = null) {
    // Vérifier que le joueur existe
    const existingPlayers = await db.query('SELECT * FROM players WHERE id = ?', {
        replacements: [id],
        type: db.QueryTypes.SELECT
    });
    
    if (existingPlayers.length === 0) {
        throw new HttpNotFoundError('Joueur non trouvé');
    }

    const existingPlayer = existingPlayers[0];
    const updates = { ...updateData };

    // Gestion de la photo
    if (uploadedFile) {
        // Nouveau fichier uploadé → supprimer l'ancien
        if (existingPlayer.photo_path && !this.isExternalUrl(existingPlayer.photo_path)) {
        deleteFile(existingPlayer.photo_path);
        }
        updates.photoPath = `/uploads/players/${uploadedFile.filename}`;
    } else if (updateData.photoUrl && this.isValidUrl(updateData.photoUrl)) {
        // Nouvelle URL fournie → supprimer l'ancien fichier local
        if (existingPlayer.photo_path && !this.isExternalUrl(existingPlayer.photo_path)) {
        deleteFile(existingPlayer.photo_path);
        }
        updates.photoPath = updateData.photoUrl;
    }

    // Construction de la requête de mise à jour
    const fields = [];
    const values = [];

    const fieldMapping = {
        teamId: 'team_id',
        firstName: 'first_name',
        lastName: 'last_name',
        nickname: 'nickname',
        jerseyNumber: 'jersey_number',
        position: 'position',
        positionPl: 'position_pl',
        birthYear: 'birth_year',
        nationality: 'nationality',
        nationalityPl: 'nationality_pl',
        photoPath: 'photo_path',
        distinction1: 'distinction1',
        distinction2: 'distinction2',
        distinction3: 'distinction3',
        distinction4: 'distinction4',
        distinction5: 'distinction5',
        isActive: 'is_active'
    };

    Object.entries(updates).forEach(([key, value]) => {
        // accepter les chaînes vides mais pas undefined/null
        if (fieldMapping[key] && value !== undefined && value !== null) {
        fields.push(`${fieldMapping[key]} = ?`);
        // Convertir les valeurs
        if (key === 'isActive') {
            values.push(value ? 1 : 0);
        } else if (value === '') {
            values.push(null); // ← Chaîne vide = NULL en base
        } else {
            values.push(value);
        }
        }
    });

    if (fields.length > 0) {
        fields.push('updated_at = NOW()');
        values.push(id);

        await db.query(`
        UPDATE players 
        SET ${fields.join(', ')}
        WHERE id = ?
        `, {
        replacements: values,
        type: db.QueryTypes.UPDATE
        });
    }

    return await this.getPlayerById(id);
    }

  // ==============================================
  // SUPPRIMER UN JOUEUR
  // ==============================================
  async deletePlayer(id) {
    const players = await db.query('SELECT photo_path FROM players WHERE id = ?', {
      replacements: [id],
      type: db.QueryTypes.SELECT
    });
    
    if (players.length === 0) {
      throw new HttpNotFoundError('Joueur non trouvé');
    }

    // Supprimer la photo uniquement si c'est un fichier local
    if (players[0].photo_path && !this.isExternalUrl(players[0].photo_path)) {
      deleteFile(players[0].photo_path);
    }

    await db.query('DELETE FROM players WHERE id = ?', {
      replacements: [id],
      type: db.QueryTypes.DELETE
    });

    return { success: true, message: 'Joueur supprimé avec succès' };
  }

  // ==============================================
  // HELPERS
  // ==============================================

  /**
   * Vérifie si une chaîne est une URL valide
   */
  isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  /**
   * Vérifie si le chemin est une URL externe (pas un chemin local)
   */
  isExternalUrl(path) {
    if (!path) return false;
    return path.startsWith('http://') || path.startsWith('https://');
  }

  /**
   * Formate un joueur pour la réponse API
   */
  formatPlayer(player) {
    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
    
    // Construire l'URL de la photo
    let photoUrl = null;
    if (player.photo_path) {
      if (this.isExternalUrl(player.photo_path)) {
        // URL externe → utiliser directement
        photoUrl = player.photo_path;
      } else {
        // Chemin local → construire l'URL complète
        photoUrl = `${BACKEND_URL}${player.photo_path}`;
      }
    }

    return {
      id: player.id,
      teamId: player.team_id,
      teamName: player.teamName || null,
      teamNamePl: player.teamNamePl || null,
      teamCategory: player.teamCategory || null,
      firstName: player.first_name,
      lastName: player.last_name,
      nickname: player.nickname,
      jerseyNumber: player.jersey_number,
      position: player.position,
      positionPl: player.position_pl,
      birthYear: player.birth_year,
      nationality: player.nationality,
      nationalityPl: player.nationality_pl,
      photoUrl,
      photoPath: player.photo_path,
      distinction1: player.distinction1,
      distinction2: player.distinction2,
      distinction3: player.distinction3,
      distinction4: player.distinction4,
      distinction5: player.distinction5,
      isActive: Boolean(player.is_active),
      createdAt: player.created_at,
      updatedAt: player.updated_at
    };
  }
}

export default new PlayerService();