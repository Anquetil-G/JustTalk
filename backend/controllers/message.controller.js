const MessageModel = require("../models/message.model");
const AccountModel = require("../models/account.model");

module.exports.getMessages = async (req, res) => {
  try {
    const message = await MessageModel.find();
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données", erreur: err });
  };
};

module.exports.getMessagesFromAuthor = async (req, res) => {
  try {
    const messages = await MessageModel.find({ author: req.params.id })
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données", erreur: err });
  }
}

module.exports.setMessages = async (req, res) => {
  const { message, author, authorPseudo } = req.body;

  // Verifications
  try {
    // Vérification du message
    if (message.length > 300) return res.status(400).json({ message: "Le message a atteint la limite de caractères" });
    if (!message) return res.status(400).json({ message: "Le message est vide" });

    // Vérification de l'auteur
    const existingAccount = await AccountModel.findById(author);
    if (!existingAccount) return res.status(400).json({ message: "L'auteur n'existe pas" });

    // Vérification du pseudo de l'auteur
    const existingPseudo = await AccountModel.find({ pseudo: authorPseudo });
    if (!existingPseudo[0].pseudo) return res.status(400).json({ message: "Le pseudo de l'auteur n'est associé à aucun compte" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors des vérification", erreur: err });
  };

  // Création du message
  try {
    const mess = await MessageModel.create({ message, author, authorPseudo });
    return res.status(200).json(mess);
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de l'envoie du message'", erreur: err });
  };
};

module.exports.editMessages = async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id);
    if (req.body.message) {
      const updateMessage = await MessageModel.findByIdAndUpdate(
        message,
        req.body,
        {new: true}
      );
      return res.status(200).json(updateMessage);
    } else {
      return res.status(400).json({ message: "Le message est invalide" });
    }
  } catch (err) {
    res.status(500).json({ message: "Une erreur est survenue lors de l'édition du message", erreur: err });
  };
};

module.exports.deleteMessages = async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id);
    await message.deleteOne();
    return res.status(200).json({ message: "Message supprimé : " + message });
  } catch (err) {
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression du message", erreur: err });
  };
};