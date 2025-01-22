'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { InfoIcon, Search } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface KeywordResult {
  keyword: string
  difficulty: string
  volume: string
  intent: string
}

export function KeywordSearchContainer() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<KeywordResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/search-keywords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword: keyword.trim() }),
        })
        console.log(response)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch keywords')
        }

        const keywordResults = await response.json()
        setResults(keywordResults)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.error('Error searching keywords:', error)
        setError(error.message, )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Search by Keywords</h1>
          <p className="text-lg text-muted-foreground">
            Find longtail and semantic keywords in your niche
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2 flex justify-center items-center gap-1">
           <InfoIcon size={16}/> Each Keyword Search uses 1 credit
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter a keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Search
              </>
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Intent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading results...
                </TableCell>
              </TableRow>
            ) : results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results found. Try searching for a keyword.
                </TableCell>
              </TableRow>
            ) : (
              results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.keyword}</TableCell>
                  <TableCell>{result.difficulty}</TableCell>
                  <TableCell>{result.volume}</TableCell>
                  <TableCell>{result.intent}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

