export default function getTextPara(title, company, date, duties) {
  var docx = require("docx");
  var text;
  var para = new docx.Paragraph({
    children: []
  });

  for (var p = 0; p < title.length; p++) {
    var cleanDutiesArray = duties[p].split("\n");

    for (var i = 0; i < cleanDutiesArray.length; i++) {
      text = new docx.TextRun({
        text: cleanDutiesArray[i]
      });

      para.addChildElement(title[p]);
      para.addChildElement(company[p]);
      para.addChildElement(date[p]);
      para.addChildElement(text);

      text = new docx.TextRun({
        text: "",
        break: 1
      });

      para.addChildElement(text);
    }
  }

  return para;
}
