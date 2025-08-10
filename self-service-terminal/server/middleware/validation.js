// Middleware для валидации входящих данных
const validateInventoryId = (req, res, next) => {
    const { InventoryID } = req.body;
    
    // Проверяем наличие Inventory ID
    if (!InventoryID) {
        return res.status(400).json({
            error: 'Отсутствует Inventory ID',
            message: 'Поле InventoryID обязательно для заполнения'
        });
    }
    
    // Проверяем формат (должен быть непустой строкой)
    if (typeof InventoryID !== 'string' || InventoryID.trim().length === 0) {
        return res.status(400).json({
            error: 'Неверный формат Inventory ID',
            message: 'Inventory ID должен быть непустой строкой'
        });
    }
    
    // Очищаем от лишних пробелов
    req.body.InventoryID = InventoryID.trim();
    
    next();
};

module.exports = {
    validateInventoryId
};
