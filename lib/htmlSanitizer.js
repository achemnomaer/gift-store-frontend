import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export default function htmlSanitizer(html) {
  let convertedHtml;
  if (html) {
    const cleanedHtml = DOMPurify.sanitize(html);
    convertedHtml = parse(cleanedHtml);

    return convertedHtml;
  }

  return;
}
