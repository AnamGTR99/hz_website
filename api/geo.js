export default function handler(request, response) {
    // Vercel automatically provides this header
    const country = request.headers['x-vercel-ip-country'] || 'US';
    response.status(200).json({ country });
}
