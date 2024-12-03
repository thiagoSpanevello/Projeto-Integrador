const verifyPermissions = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const usuario = req.user;  // Alterado para acessar req.user

            if (!usuario || !usuario.cargo) {
                console.error('Usuário sem permissões ou não autenticado:', usuario);
                return res.status(403).json({ message: 'Acesso negado. Usuário sem permissões.' });
            }

            console.log('Cargo do usuário:', usuario.cargo);
            console.log('Permissões necessárias:', allowedRoles);

            // Verifica se o cargo do usuário está na lista de permissões permitidas
            const hasPermission = allowedRoles.includes(usuario.cargo);

            if (!hasPermission) {
                console.error('Acesso negado. Permissões insuficientes.');
                return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
            }

            next(); // Permitir acesso
        } catch (error) {
            console.error('Erro ao verificar permissões: ', error);
            return res.status(500).json({ message: 'Erro interno ao verificar permissões.' });
        }
    };
};

export default verifyPermissions;
