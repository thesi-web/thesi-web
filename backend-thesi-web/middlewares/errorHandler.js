// Middleware para tratar erros 500 (Erro interno do servidor)
module.exports = (req, res) => {
    console.error(`Erro no servidor: ${err.message}`) // Exibe a mensagem de erro no console
    res.type('text/plain') // Define o tipo de resposta como texto simples
    res.status(500) // Define o status HTTP como 500 (Server Error)
    res.send('Erro 500: Ocorreu um problema interno no servidor. Tente novamente mais tarde ou entre em contato com o suporte.') // Mensagem de erro mais detalhada
}