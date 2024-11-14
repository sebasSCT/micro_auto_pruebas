const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumber_report.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome 91.0",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Local"
  }
};

const fs = require('fs');
const path = './reports/cucumber_report.html';
const cssLink = '<link rel="stylesheet" type="text/css" href="cssreporte.css">';

// Inserta el enlace de CSS al archivo HTML
fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;

  const updatedHtml = data.replace('</head>', `${cssLink}</head>`);
  fs.writeFile(path, updatedHtml, 'utf8', (err) => {
    if (err) throw err;
    console.log('CSS personalizado agregado al reporte.');
  });
});

reporter.generate(options);