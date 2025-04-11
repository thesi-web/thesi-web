// Middleware para tratar erros 404 (Página não encontrada)
module.exports = (req, res) => {
    res.type('text/plain') // Define o tipo de resposta como texto simples
    res.status(404) // Define o status HTTP como 404 (Not Found)
    res.send('Erro 404: O recurso que você procura não foi encontrado. Verifique a URL e tente novamente.') // Orientações para o usuário
}
