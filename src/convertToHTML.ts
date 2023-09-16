export default function convertToHTML(content: string) {
	const convertedHTML = `<html><body>${content}</body></html>`;
	return convertedHTML;
}
