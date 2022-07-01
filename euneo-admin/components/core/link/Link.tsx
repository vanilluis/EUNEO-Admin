// React&NextJS
import React from 'react'
import NextLink from 'next/link' // alias of Link

export type LinkProps = {
    children: React.ReactNode
    to: string
    transition?: boolean
    className?: string
    [key: string]: unknown
}

export const Link = ({
    children,
    to,
    ...props
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '')

    if (isExternal) {
        return (
            <a target="_blank" rel="noopener noreferrer" href={to} {...props}>
                {children}
            </a>
        )
    }

    return (
        <NextLink href={to} prefetch={to === '/' ? false : undefined}>
            <a {...props}>{children}</a>
        </NextLink>
    )
}
