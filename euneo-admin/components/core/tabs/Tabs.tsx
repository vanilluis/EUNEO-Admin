// React&NextJS
import React, { useEffect } from 'react'
// 3rd party libraries
import { motion } from 'framer-motion'
// Styles
import s from './Tabs.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    tabNames: Array<string>
    setState: Function
    className?: string
    selectedTab: String | Boolean
    noFrag?: Boolean
    [key: string]: unknown
}

export const Tabs = ({
    setState,
    tabNames,
    selectedTab,
    className,
    noFrag,
    ...props
}: Props) => {
    useEffect(() => {
        if (!noFrag) {
            let fragment: string
            fragment = window.location.hash.replace('#', '')
            setState(fragment || tabNames[0])
        }
    }, [])

    useEffect(() => {
        if (selectedTab !== false && !noFrag) {
            window.history.replaceState(null, null, `#${selectedTab}`)
        }
    }, [selectedTab])

    return (
        <motion.div className={c(s.container, className)} {...props}>
            {tabNames.map((name) => {
                return (
                    <button
                        type="button"
                        key={name}
                        onClick={() => setState(name)}
                        className={c(s.tab, name === selectedTab && s.selected)}
                    >
                        {name}
                        {name === selectedTab && (
                            <motion.div
                                layoutId="outline"
                                className={c(s.outline)}
                                initial={false}
                                transition={{
                                    ease: [0.65, 0, 0.35, 1],
                                }}
                            />
                        )}
                    </button>
                )
            })}
        </motion.div>
    )
}

Tabs.defaultProps = {
    variant: 'ghost',
    onClick: undefined,
}
