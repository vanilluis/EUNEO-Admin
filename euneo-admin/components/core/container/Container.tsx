// React&NextJS
import React from 'react'
// Styles
import s from './Container.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    className?: string
    nogrid?: boolean
    noPadd?: boolean
    [key: string]: unknown
}

export const Container = ({
    className,
    noGrid = false,
    noPadd = false,
    ...props
}: Props) => {
    return (
        <div
            className={c(
                className,
                s.container,
                s[!noGrid && 'grid'],
                s[noPadd && 'padd']
            )}
            {...props}
        />
    )
}
