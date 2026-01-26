import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get('code');

    if (!code) {
        return new Response(JSON.stringify({ error: 'No code provided' }), { status: 400 });
    }

    try {
        const res = await fetch(`http://localhost:3000/chat?code=${code}`);
        const data = await res.json();

        const html = `
            <html>
                <body>
                    <script>
                        // Enviar access_token a la ventana principal
                        window.opener.postMessage(
                            ${JSON.stringify(data)}, 
                            window.location.origin
                        );
                        // Cerrar la ventana popup
                        window.close();
                    </script>
                </body>
            </html>
        `;

        return new Response(html, {
            headers: { 'Content-Type': 'text/html' }
        });

    } catch (error) {
        return new Response('Error fetching access token', { status: 500 });
    }
};
