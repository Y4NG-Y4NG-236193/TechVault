'use client'
import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { Product } from '@/types/product'



export function AISearch() {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<{ answer: String; products: any[] } | null>(null)
    const [loading, setLoading] = useState(false)

    const search = async () => {
        setLoading(true)
        const res = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
        setResult(await res.json())
        setLoading(false)
    }


    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Find me a waterproof hiking boot under ₱3,000..."
            />
            <button onClick={search} disabled={loading}>
                {loading ? 'Searching...' : 'Ask AI'}
            </button>

            {result && (
                <div>
                    <p>{result.answer}</p> {/* AI's natural language reply */}
                    {result.products.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}