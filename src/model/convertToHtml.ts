export default function convertToHtml(content: string): string {
	const convertedHTML = `<html><body>${content}</body></html>`;
	return convertedHTML;
}
