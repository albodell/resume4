export default function getTextPara(textElement) {
  var docx = require("docx");
  var fs = require("fs");
  var text;
  var para = new docx.Paragraph({
    children: []
  });

  var cleanTextArray = textElement.split("\n");

  for (var i = 0; i < cleanTextArray.length; i++) {
    text = new docx.TextRun({
      text: cleanTextArray[i]
    });

    para.addChildElement(text);

    text = new docx.TextRun({
      text: "",
      break: 1
    });

    para.addChildElement(text);
  }

  return para;
}
