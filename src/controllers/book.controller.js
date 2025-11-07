const Book = require("../models/book.model");

exports.listBooks = async (req, res, next) => {
  try {
    const { q, author, available, page = 1, limit = 10 } = req.query;
    
    let books = await Book.findAll();

    if (q) {
      books = books.filter(b => 
        b.title.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (author) {
      books = books.filter(b => 
        b.author.toLowerCase().includes(author.toLowerCase())
      );
    }
    if (available !== undefined) {
      books = books.filter(b => b.available === (available === 'true'));
    }

    const total = books.length;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit));
    const offset = (pageNum - 1) * limitNum;
    
    const paginatedBooks = books.slice(offset, offset + limitNum);

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      data: paginatedBooks
    });
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

