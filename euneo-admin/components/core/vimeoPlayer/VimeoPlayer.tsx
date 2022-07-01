// React&NextJS
import React, { useState } from 'react'

// Styles
import s from './VimeoPlayer.module.scss'

import Vimeo from '@u-wave/react-vimeo'
import { usePlausible } from 'next-plausible'
import { Image } from '../image/Image'

export const VimeoPlayer = ({ vimeoId, imgSrc }) => {
    const [play, setPlay] = useState(true)
    const [, setLoading] = useState(true)
    const plausible = usePlausible()

    return (
        <div className={s.vimeoContainer}>
            {play && <Image className={s.placeholder} src={imgSrc} alt="" />}
            {play && (
                <div
                    className={s.mainButton}
                    onClick={() => {
                        setPlay((prev) => !prev)
                        plausible('homepage-auglysing-button')
                    }}
                >
                    <button className={s.play}>
                        <svg
                            width="17"
                            height="18"
                            viewBox="0 0 17 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={s.triangle}
                        >
                            <path
                                d="M15.0703 6.40304C17.0703 7.55774 17.0703 10.4445 15.0703 11.5992L5.21317 17.2902C3.21317 18.4449 0.713172 17.0015 0.713172 14.6921L0.713173 3.31009C0.713173 1.00069 3.21317 -0.442684 5.21317 0.712017L15.0703 6.40304Z"
                                fill="white"
                            />
                        </svg>
                        <svg
                            width="88"
                            height="88"
                            viewBox="0 0 88 88"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={s.circle}
                        >
                            <circle
                                opacity="0.4"
                                cx="44"
                                cy="44"
                                r="44"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            )}

            <Vimeo
                video={vimeoId}
                className={s.vimeo}
                height={'1000px'}
                width={'1000px'}
                background={!play}
                volume={1}
                paused={play}
                dnt={true}
                // responsive={true}
                onLoaded={() => setLoading(false)}
                controls={true}
            ></Vimeo>
        </div>
    )
}
