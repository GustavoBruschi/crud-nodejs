const userCache = {};

const generateId = () => Math.random().toString(36).substring(2, 9);

exports.getAllUsers = (req, res) => {
    const users = Object.values(userCache);
    res.status(200).json(users);
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    const user = userCache[id];
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const id = generateId();
    const newUser = { id, name, email };
    userCache[id] = newUser;
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = userCache[id];
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    user.name = name;
    user.email = email;
    res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    if (!userCache[id]) return res.status(404).json({ message: "Usuário não encontrado" });

    delete userCache[id];
    res.status(200).json({ message: "Usuário deletado com sucesso" });
};
