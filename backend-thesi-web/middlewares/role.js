module.exports = (req, res, next) => {

    const token = req.header("auth-token");
    
    if (!token) return res.status(401).json({ msg: "Acesso negado" });

    try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== role) {
        return res.status(403).json({ msg: "Permissão negada" });
    }

    req.user = verified;
    next();

    } catch (err) {
    res.status(400).json({ msg: "Token inválido" });
    }
    
};