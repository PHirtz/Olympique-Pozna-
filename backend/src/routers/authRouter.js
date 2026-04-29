import express from 'express';
import crypto from 'crypto';
import argon2 from 'argon2';
import { Op } from 'sequelize';
import User from '../models/user.model.js';
import PasswordResetToken from '../models/passwordResetToken.model.js';
import emailService from '../services/email.service.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const jsonParser = express.json();

// PUT /api/auth/change-password (connecté)
router.put('/change-password', jsonParser, authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Champs manquants.' });
    if (newPassword.length < 8)
      return res.status(400).json({ message: 'Minimum 8 caractères.' });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    const valid = await argon2.verify(user.password, currentPassword);
    if (!valid) return res.status(401).json({ message: 'Mot de passe actuel incorrect.' });

    user.password = await argon2.hash(newPassword);
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur change-password:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// POST /api/auth/forgot-password (public)
router.post('/forgot-password', jsonParser, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email requis.' });

    const user = await User.findOne({ where: { email } });

    // Réponse identique que l'email existe ou non (sécurité)
    if (!user) {
      return res.json({ message: 'Si cet email existe, un lien vous a été envoyé.' });
    }

    // Supprimer les anciens tokens
    await PasswordResetToken.destroy({ where: { userId: user.id } });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await PasswordResetToken.create({ token, userId: user.id, expiresAt });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await emailService.sendPasswordReset(user, resetUrl);

    res.json({ message: 'Si cet email existe, un lien vous a été envoyé.' });
  } catch (error) {
    console.error('Erreur forgot-password:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// POST /api/auth/reset-password (public)
router.post('/reset-password', jsonParser, async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ message: 'Données manquantes.' });
    if (newPassword.length < 8)
      return res.status(400).json({ message: 'Minimum 8 caractères.' });

    const resetToken = await PasswordResetToken.findOne({
      where: {
        token,
        used: false,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!resetToken)
      return res.status(400).json({ message: 'Lien invalide ou expiré.' });

    const user = await User.findByPk(resetToken.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    user.password = await argon2.hash(newPassword);
    await user.save();

    resetToken.used = true;
    await resetToken.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    console.error('Erreur reset-password:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;