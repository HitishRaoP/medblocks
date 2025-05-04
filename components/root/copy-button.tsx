'use client'
import React, { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'

interface CopyButtonProps {
    displayText: string
    copiedText: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ displayText, copiedText }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copiedText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy!', err)
        }
    }

    return (
        <div
            className="relative group inline-flex items-center space-x-2 py-1"
            onClick={handleCopy}
        >
            <span>{displayText}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
            </span>
        </div>
    )
}
