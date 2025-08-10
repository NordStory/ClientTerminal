function createTrigger() {
	ScriptApp.newTrigger('generateNextOrderNumber')
		.forSpreadsheet(SpreadsheetID)
		.onFormSubmit()
		.create()
}
