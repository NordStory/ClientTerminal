function generateNextOrderNumber() {
    // Сортируем список по второму столбцу (по номеру заказа)
    var orderRange = sheetForm.getRange('A2:O')
    orderRange.sort(2)
    
    // Определяем последнюю строку
    var lastRowIndex = sheetForm.getLastRow()
    
    // Присваиваем номер последней строки к ячейке
    var newOrderNumberCell = 'B' + lastRowIndex
    var previousOrderNumberCell = 'B' + (lastRowIndex - 1)
    
    // Берем данные предыдущего номера заказа
    var previousOrderNumber = sheetForm.getRange(previousOrderNumberCell).getValue()
    
    // Записываем новый номер заказа
    sheetForm.getRange(newOrderNumberCell).setValue(previousOrderNumber + 1)
    
    // Записываем номер в акт приема
    sheetAcceptance.getRange('B7').setValue(previousOrderNumber + 1)
    
    fillAcceptanceCertificate()
}
