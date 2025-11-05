const Profile = require("../models/profile.model");
const User = require("../models/user.model");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: "Profil non trouvé" });
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const { userId, preferences, history } = req.body;
    console.log(`🔷 [MongoDB] Création d'un profil pour userId: ${userId}`);
    
    if (!userId) {
      return res.status(400).json({ error: "userId est requis" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const existing = await Profile.findOne({ userId });
    if (existing) {
      return res.status(400).json({ error: "Ce profil existe déjà" });
    }

    const profile = await Profile.create({ userId, preferences, history });
    console.log(`✅ [MongoDB] Profil créé: ${profile._id}`);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { preferences, history } = req.body;
    console.log(`🔄 [MongoDB] Mise à jour du profil userId: ${req.params.userId}`);
    
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: "Profil non trouvé" });
    }

    if (preferences) {
      if (preferences.genres) profile.preferences.genres = preferences.genres;
      if (preferences.authors) profile.preferences.authors = preferences.authors;
    }

    if (history) {
      profile.history.push(...history);
      console.log(`✅ [MongoDB] ${history.length} élément(s) ajouté(s) à l'historique`);
    }

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.getUserFull = async (req, res, next) => {
  try {
    console.log(`🔗 [MIXTE] Récupération user-full pour ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const profile = await Profile.findOne({ userId: req.params.id });
    console.log(`✅ [MIXTE] User SQL + Profil MongoDB récupérés`);

    res.status(200).json({
      user,
      profile: profile || { message: "Aucun profil MongoDB associé" }
    });
  } catch (error) {
    next(error);
  }
};

