const verifyPermissions = (allowedRoles) => {
    return (req, res, next) => {
        try {

            const usuario = res.locals.usuario;

            if (!usuario || !usuario.rules) {
                return res.status(403).json({ message: 'Acesso negado. Usuário sem permissões.' });
            }

            const hasPermission = allowedRoles.some(role => usuario.rules.includes(role));

            if (!hasPermission) {
                return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
            }

            next();
        } catch (error) {
            console.error('Erro ao verificar permissões: ', error);
            return res.status(500).json({ message: 'Erro interno ao verificar permissões.' });
        }
    };
};

export default verifyPermissions;