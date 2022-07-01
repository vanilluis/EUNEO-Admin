// React&NextJS
import React, { useState } from 'react'
// 3rd party libraries
import { motion, useAnimation } from 'framer-motion'
// Styles
import s from './Hamburger.module.scss'
import c from 'classnames'

type Props = {
    open: boolean
    beWhite: boolean
    [key: string]: unknown
}

export const Hamburger = ({ open, beWhite, ...props }: Props) => {
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)

    const spanAnimationControls = useAnimation()
    const span1AnimationControls = useAnimation()
    const span2AnimationControls = useAnimation()
    const span21AnimationControls = useAnimation()

    return (
        <motion.button
            onHoverStart={() => {
                if (!isAnimationPlaying) {
                    setIsAnimationPlaying(true)
                    spanAnimationControls.start({
                        transform: ['translateX(0%)', 'translateX(200%)'],
                        transition: {
                            type: 'tween',
                            repeat: 0,
                        },
                    })
                    span1AnimationControls.start({
                        transform: ['translateX(0%)', 'translateX(200%)'],
                        transition: {
                            type: 'tween',
                            repeat: 0,
                            delay: 0.12,
                        },
                    })
                    span2AnimationControls.start({
                        transform: ['translateX(-200%)', 'translateX(0%)'],
                        transition: {
                            type: 'tween',
                            repeat: 0,
                        },
                    })
                    span21AnimationControls.start({
                        transform: ['translateX(-200%)', 'translateX(0%)'],
                        transition: {
                            type: 'tween',
                            repeat: 0,
                            delay: 0.12,
                        },
                    })
                }
            }}
            className={c(s.burger, s[open && 'open'], s[beWhite && 'white'])}
            {...props}
        >
            <span className={c(s.container)}>
                <span className={c(s.line, s.line__one)}>
                    <motion.span
                        animate={spanAnimationControls}
                        className={c(s.after)}
                    />
                    <motion.span
                        animate={span2AnimationControls}
                        className={c(s.anim, s.anim__one)}
                    ></motion.span>
                </span>
                <span className={c(s.line, s.line__two)}>
                    <motion.span
                        animate={span1AnimationControls}
                        onAnimationComplete={() => {
                            setIsAnimationPlaying(false)
                        }}
                        className={c(s.after)}
                    />
                    <motion.span
                        animate={span21AnimationControls}
                        className={c(s.anim, s.anim__two)}
                    ></motion.span>
                </span>
            </span>
        </motion.button>
    )
}
