// Styles
import s from './MainImgTag.module.scss'
import classnames from 'classnames'
// Components
import { Icon } from '../icon/Icon'
import { Text } from '../text/Text'

const c = classnames.bind(s)

type Props = {
    icon?: 'star'
    width?: string
    height?: string
    variant: 'icon' | 'text'
    selected?: boolean
    size?: string
    [key: string]: unknown
}

export const MainImgTag = ({
    icon,
    width,
    height,
    children,
    variant,
    selected,
    size,
    ...props
}: Props) => {
    return (
        <>
            {variant === 'text' && (
                <button
                    id="imageButton"
                    type="button"
                    className={c(
                        props.className,
                        s[variant],
                        s[selected && 'selected']
                    )}
                    {...props}
                >
                    <Text variant="p-small">{children}</Text>
                </button>
            )}
            {variant === 'icon' && (
                <div
                    id="iconTag"
                    style={size ? { height: size, width: size } : {}}
                    className={c(
                        props.className,
                        s[variant]
                        // s[selected && 'selected']
                    )}
                    {...props}
                >
                    <Icon variant={icon} width={width} height={height} />
                </div>
            )}
        </>
    )
}
