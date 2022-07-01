// React&NextJS
import React, { useState } from 'react'
// Styles
import s from './Label.module.scss'
import classnames from 'classnames'
// Components
import { Tooltip } from '../toolTip/Tooltip'

const c = classnames.bind(s)

type Props = {
    tooltip?: string
    file?: boolean
    [key: string]: unknown
}

export const Label = ({ tooltip, children, file }: Props) => {
    const [clicked, setClicked] = useState(false)

    return (
        <div
            className={s.labelInfo}
            onClick={() => setClicked((prev) => !prev)}
        >
            <label className={c(s.pointer, file && s.fileLabel)}>
                {children}
            </label>
            {tooltip && <Tooltip text={tooltip} clicked={clicked} />}
        </div>
    )
}
