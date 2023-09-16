export default function convertToHtml(content: string) {
	const convertedHTML = `<html><body>${content}</body></html>`;
	return convertedHTML;
}
