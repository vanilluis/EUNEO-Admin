// React&NextJS
import classnames from 'classnames'
import React from 'react'
import { Icon } from '../icon/Icon'
//Styles
import s from './LinkButton.module.scss'
const c = classnames.bind(s)

export type LinkButtonProps = {
    url: string
    icon: 'facebook' | 'instagram'
    color?: 'white'
}

export const LinkButton = ({ url, icon, color, ...props }: LinkButtonProps) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={url} {...props}>
            <div className={c(s[color ? `iconBtn__${color}` : 'iconBtn'])}>
                <Icon variant={icon} />
            </div>
        </a>
    )
}
