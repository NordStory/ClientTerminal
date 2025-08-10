const spreadSheetID = 'ВАШ_ID_ТАБЛИЦЫ_ЗДЕСЬ'
const spreadSheet = SpreadsheetApp.openById(spreadSheetID)
const sheetForm = spreadSheet.getSheetByName('Форма')
const sheetAcceptance = spreadSheet.getSheetByName('АктПриёма')

// Константы для адресов ячеек в акте приема
const ACCEPTANCE_CELLS = {
  orderNumber: 'B7',
  customerName: 'B9',
  phone: 'B11',
  socialNetwork: 'B13',
  motherboard: 'B15',
  serialNumber: 'B16',
  equipment: 'B17:H17',
  problem: 'B18:H18'
}

function fillAcceptanceCertificate() {
  const lastRow = sheetForm.getLastRow()
  
  // Получаем все данные из последней строки формы
  const formData = {
    orderNumber: sheetForm.getRange(`B${lastRow}`).getValue(),
    customerName: sheetForm.getRange(`D${lastRow}`).getValue(),
    phone: sheetForm.getRange(`E${lastRow}`).getValue(),
    motherboard: sheetForm.getRange(`F${lastRow}`).getValue(),
    serialNumber: sheetForm.getRange(`G${lastRow}`).getValue(),
    equipment: sheetForm.getRange(`H${lastRow}`).getValue(),
    socialNetwork: sheetForm.getRange(`I${lastRow}`).getValue(),
    problem: sheetForm.getRange(`L${lastRow}`).getValue()
  }
  
  // Заполняем акт приема данными
  Object.entries(ACCEPTANCE_CELLS).forEach(([key, cellAddress]) => {
    sheetAcceptance.getRange(cellAddress).setValue(formData[key])
  })
}