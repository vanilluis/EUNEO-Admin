// Styles
import s from './DropzoneButton.module.scss'
// Components
import { Icon } from '../icon/Icon'
import { Text } from '../text/Text'

type Props = {
    icon?: 'cloud' | 'upload' | 'galleryUpload'
    isDragActive?
    [key: string]: unknown
}

export const DropzoneButton = ({ icon, children, isDragActive }: Props) => {
    return (
        <div className={s.container}>
            <div
                className={s.innerContainer}
                style={isDragActive ? onDrag : {}}
            >
                <Icon variant={icon} />
                <Text variant="p-small" style={{ fontStyle: 'italic' }}>
                    {children}
                </Text>
            </div>
        </div>
    )
}

const onDrag = {
    borderColor: '#666666',
}
