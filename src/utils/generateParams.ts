export default function generateParams(params: Record<string, string | number>) {
  return new URLSearchParams({ ...params, $format: 'JSON' }).toString();
}
