const Book = require("../models/book.model");

exports.listBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ total: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, available } = req.body;
    console.log(`📚 [SQL] Création d'un livre: "${title}" par ${author}`);
    
    if (!title || !author) {
      return res.status(400).json({ error: "title et author sont requis" });
    }

    const book = await Book.create({ title, author, available });
    console.log(`✅ [SQL] Livre créé avec l'ID: ${book.id}`);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updated = await Book.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

