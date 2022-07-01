// React&NextJS
import React from 'react'
// Styles
import s from './WhiteBox.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    className?: string
    [key: string]: unknown
}

export const WhiteBox = ({ className, ...props }: Props) => {
    return <div className={c(className, s.container)} {...props} />
}
