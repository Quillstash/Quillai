'use client'

import { useState } from 'react'
import { Link } from 'lucide-react'
import type { Editor } from '@tiptap/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function LinkItem({ editor }: { editor: Editor }) {
  const previousUrl = editor?.getAttributes('link').href
  const [enteredUrl, setEnteredUrl] = useState(previousUrl)

  const addLink = (url: string) => {
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={editor?.isActive('link') ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Toggle link</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Set link</h4>
          <div className="flex items-center gap-2">
            <Input
              id="link"
              value={enteredUrl}
              onChange={(e) => setEnteredUrl(e.target.value)}
              placeholder="https://example.com"
              className="col-span-3 h-8"
            />
            <Button
              size="sm"
              className="px-3"
              onClick={() => addLink(enteredUrl)}
            >
              <Link className="h-4 w-4 mr-2" />
              Set
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LinkItem

