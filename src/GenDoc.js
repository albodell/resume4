import "./styles.css";
import { Paragraph, Document, Packer } from "docx";
import { saveAs } from "file-saver";
import split from "./Split";
import jobFormat from "./JobFormat";
//generates doc and holds basic html headers words and stuff

//export default function GenDoc(values) {
export default function generate(values) {
  const skills = split(values["skills"]);
  const experience = jobFormat(
    values["experience"],
    values["company"],
    values["date"],
    values["duties"]
  );
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: values["name"],
            bullet: {
              level: 0 //How deep you want the bullet to be
            }
          }),
          skills,
          experience,
          new Paragraph({
            text: skills
            // bullet: {
            //   level: 0
            // }
          })
        ]
      }
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
}
// console.log(generate);
//return {generate}
//return <button onClick={generate}> Generate doc </button>;
//}
