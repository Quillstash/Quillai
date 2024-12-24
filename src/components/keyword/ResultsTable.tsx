/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'

  
  interface ResultsTableProps {
    results: any[]
    isLoading: boolean
  }
  
  export function ResultsTable({ results, isLoading }: ResultsTableProps) {
    return (
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
    )
  }
  
  