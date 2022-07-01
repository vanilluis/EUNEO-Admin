// Styles
import s from './ImageButton.module.scss'
import classnames from 'classnames'
// Components
import { Icon } from '../icon/Icon'
import { Text } from '../text/Text'

const c = classnames.bind(s)

type Props = {
    icon?: 'trash' | 'image' | 'settings' | 'x' | 'star'
    width?: string
    height?: string
    variant: 'icon' | 'text' | 'remove' | 'select'
    selected?: boolean
    size?: string
    [key: string]: unknown
}

export const ImageButton = ({
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
            {variant !== 'icon' && (
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
                    <Text variant="p-small">
                        {(variant === 'select' || variant === 'remove') && (
                            <Icon
                                variant={icon}
                                width={width}
                                height={height}
                            />
                        )}{' '}
                        {children}
                    </Text>
                </button>
            )}
            {variant === 'icon' && (
                <button
                    id="imageButton"
                    style={size ? { height: size, width: size } : {}}
                    type="button"
                    className={c(
                        props.className,
                        s[variant],
                        s[selected && 'selected']
                    )}
                    {...props}
                >
                    <Icon variant={icon} width={width} height={height} />
                </button>
            )}
        </>
    )
}
