// from data.js
var tableData = data;

// // YOUR CODE HERE!

// get table references
var tbody = d3.select("tbody");
function newUFOTable(data) {
 //clear out any existing data
 tbody.html("");
//Loop through data
 data.forEach((dataRow) => {
   // Append a row to the table body
   var row = tbody.append("tr");
   Object.values(dataRow).forEach((val) => {
     var cell = row.append("td");
     cell.text(val);
   });
 });
}
// Keep Track of filters
var filters = {};
function updateFilters() {
 // Save the element
 var newElement = d3.select(this).select("input");
 var elementName = newElement.property("value");
 var filterId = newElement.attr("id");
// Add fliter to list
 if (elementName) {
   filters[filterId] = elementName;
 }
 else {
   delete filters[filterId];
 }
 
 filterTable();
}
function filterTable() {
 // Set the filteredData to the tableData
 let fData = tableData;
 // Loop through all of the filters and keep any data that
 // matches the filter values
 Object.entries(filters).forEach(([key, value]) => {
   fData = fData.filter(row => row[key] === value);
 });
 // rebuild table
 newUFOTable(fData);
}
// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);
// Build the table when the page loads
newUFOTable(tableData);

