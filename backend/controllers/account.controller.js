const AccountModel = require("../models/account.model");

module.exports.getAccounts = async (req, res) => {
  try {
    const account = await AccountModel.find();
    return res.status(200).json(account);
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données", erreur: err });
  };
};

module.exports.getOneAccount = async (req, res) => {
  try {
    const account = await AccountModel.findById(req.params.id);
    return res.status(200).json(account);
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données", erreur: err });
  };
};

module.exports.checkOneAccount = async (req, res) => {
  const { pseudoOrEmail, password } = req.query;

  // Verification inputs
  try {
    if (!pseudoOrEmail) return res.status(400).json({ message: "Le pseudo unique / email doit être indiqué" });
    if (!password) return res.status(400).json({ message: "Le mot de passe doit être indiqué" });
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors des vérifications des inputs", erreur: err });
  }

  // Verification de l'existence du compte
  try {
    const existingAccount = await AccountModel.findOne({ $or: [{ pseudo: pseudoOrEmail }, { email: pseudoOrEmail }] });

    if (!existingAccount) {
      return res.status(400).json({ message: "Le compte n'existe pas" });
    }

    if (existingAccount.password === password) {
      return res.status(200).json(existingAccount);
    } else {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Une erreur est survenue lors de la recherche du compte", erreur: err });
  }
};

module.exports.setAccounts = async (req, res) => {
  const { pseudo, email, password } = req.body;
  
  // Verifications
  try {
    // Vérification du pseudo
    const existingAccount = await AccountModel.findOne({ pseudo });
    if (existingAccount) return res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
    if (pseudo.length > 20) return res.status(400).json({ message: "Le pseudo a atteint la limite de caractères" });
    if (!pseudo || pseudo.length < 4) return res.status(400).json({ message: "Le pseudo ne peut pas être en dessous de 4 caractères" });

    // Vérification de l'email
    const existingEmail = await AccountModel.findOne({ email });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email ||!regex.test(email)) return res.status(400).json({ message: "Email invalide" });
    if (existingEmail) return res.status(400).json({ message: "Cet email est déjà utilisé" });

    // Verification de mdp
    if (!password || password.length < 5) return res.status(400).json({ message: "Le mot de passe ne peut pas être en dessous de 5 caractères" });
    if (password.length > 50) return res.status(400).json({ message: "Le mot de passe a atteint la limite de caractères" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur au niveau du serveur, veuillez réessayer plus tard", erreur: err });
  };

  // Création du compte
  try {
    const account = await AccountModel.create({ pseudo, email, password });
    return res.status(200).json(account);
  } catch (err) {
    return res.status(500).json({ message: "Erreur au niveau du serveur, veuillez réessayer plus tard", erreur: err });
  };
};

module.exports.editAccounts = async (req, res) => {
  try {
    const account = await AccountModel.findById(req.params.id);
    const updateAccount = await AccountModel.findByIdAndUpdate(
      account,
      req.body,
      {new: true}
    );
    return res.status(200).json(updateAccount);
  } catch (err) {
    res.status(500).json({ message: "Une erreur est survenue lors de l'édition du compte", erreur: err });
  };
};

module.exports.deleteAccounts = async (req, res) => {
  try {
    const account = await AccountModel.findById(req.params.id);
    await account.deleteOne();
    return res.status(200).json({ message: "Compte supprimé : " + account });
  } catch (err) {
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression du compte", erreur: err });
  };
};