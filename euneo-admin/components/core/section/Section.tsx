// React&NextJS
import React from 'react'
// Types
import { HTMLElementList } from '../../../types/html-types'
// Styles
import s from './Section.module.scss'
import c from 'classnames'
// Components
import { Container } from '../container/Container'

type IProps = {
    children: React.ReactNode
    container?: boolean
    as?: HTMLElementList
    className?: string
    noDynamicPadding?: Boolean
}

export const Section = ({
    children,
    container = false,
    as = 'section',
    className,
    noDynamicPadding,
}: IProps) => {
    const SectionEl = as
    const content = container ? <Container>{children}</Container> : children

    return (
        <SectionEl
            className={c(s.section, className, noDynamicPadding && s.noDynPadd)}
        >
            {content}
        </SectionEl>
    )
}
