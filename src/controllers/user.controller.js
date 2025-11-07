const User = require("../models/user.model");

exports.listUsers = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    let users = await User.findAll();

    if (q) {
      users = users.filter(u => 
        u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase())
      );
    }

    const total = users.length;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit));
    const offset = (pageNum - 1) * limitNum;
    
    const paginatedUsers = users.slice(offset, offset + limitNum);

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      data: paginatedUsers
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    console.log(`📝 [SQL] Création d'un user: ${name} (${email})`);
    
    if (!name || !email) {
      return res.status(400).json({ error: "name et email sont requis" });
    }

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "Cet email existe déjà" });
    }

    const user = await User.create({ name, email });
    console.log(`✅ [SQL] User créé avec l'ID: ${user.id}`);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
