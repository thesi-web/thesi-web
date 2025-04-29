const Notifications = require("../models/Notifications");

class NotificationsController {

    async getAll(req, res) {
        try{

            const userId = req.userId; 

            const notifications = await Notifications.findByUserId(userId);
            res.json(notifications);

        } catch(err) {
            console.error("Erro ao buscar notificações:", err);
            res.status(500).json({ erro: "Erro ao buscar as notificações do usuário" });
        }
    }

    async markAsRead(req, res) {
        try {
          const userId = req.userId; // se você já usa middleware do token
          const { projetoId } = req.body;
      
          if (!userId || !projetoId) {
            return res.status(400).json({ erro: "Parâmetros ausentes" });
          }
      
          const updated = await Notifications.markAsRead(userId, projetoId);
      
          if (updated === 0) {
            return res.status(404).json({ erro: "Notificação não encontrada" });
          }
      
          res.status(200).json({ mensagem: "Notificação marcada como lida" });
      
        } catch (err) {
          console.error("Erro ao marcar notificação como lida:", err);
          res.status(500).json({ erro: "Erro no servidor" });
        }
    }
}

module.exports = new NotificationsController();