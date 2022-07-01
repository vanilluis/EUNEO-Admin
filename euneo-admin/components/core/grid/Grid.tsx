// React&NextJS
import React from 'react'
// Styles
import s from './Grid.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    className?: string
    [key: string]: unknown
}

export const Grid = ({ className, ...props }: Props) => {
    return <div className={c(s.grid, className)} {...props} />
}
