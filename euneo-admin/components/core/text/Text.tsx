// React&NextJS
import React from 'react'
// Styles
import s from './Text.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    variant?:
        | 'p-18'
        | 'p'
        | 'p-small'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'date'
        | 'error'
    label?: string
    align?: 'center'
    className?: string
    [key: string]: unknown
}

export const Text = ({
    tag,
    variant,
    label,
    children,
    align,
    className,
    ...props
}: Props) => {
    if (tag) {
        if (tag === 'h1') {
            return (
                <h1 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h1>
            )
        } else if (tag === 'h2') {
            return (
                <h2 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h2>
            )
        } else if (tag === 'h3') {
            return (
                <h3 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h3>
            )
        } else if (tag === 'h4') {
            return (
                <h4 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h4>
            )
        } else if (tag === 'h5') {
            return (
                <h5 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h5>
            )
        } else if (tag === 'h6') {
            return (
                <h6 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h6>
            )
        }
    } else {
        if (variant === 'h1') {
            return (
                <h1 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h1>
            )
        } else if (variant === 'h2') {
            return (
                <h2 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h2>
            )
        } else if (variant === 'h3') {
            return (
                <h3 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h3>
            )
        } else if (variant === 'h4') {
            return (
                <h4 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h4>
            )
        } else if (variant === 'h5') {
            return (
                <h5 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h5>
            )
        } else if (variant === 'h6') {
            return (
                <h6 className={c(s[variant], s[align], className)} {...props}>
                    {label}
                    {children}
                </h6>
            )
        }
    }
    return (
        <p className={c(className, s[variant], s[align])} {...props}>
            {label}
            {children}
        </p>
    )
}

Text.defaultProps = {
    variant: 'p',
}
