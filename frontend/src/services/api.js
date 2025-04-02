export async function graphQLRequest(query, variables = {}) {
    try {
        const result = await fetch('http://scandiweb-store/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });

        const data = await result.json();

        if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            return null;
        }

        return data.data ?? null;
    } catch (error) {
        console.error('Network or server error:', error);
        return null;
    }
}
