// React&NextJS
import React, { MutableRefObject, useState } from 'react'
// Styles
import s from './TextArea.module.scss'
import c from 'classnames'
// Components
import { Label } from '../label/Label'
import { Text } from '../text/Text'
import { Control, Controller, FieldValues } from 'react-hook-form'

type Props = {
    id: string
    label?: string
    className?: string
    placeholder?: string
    infoText?: string
    errorMsg?: string
    maxLength?: number
    initialCharLength?: number
    control?: Control<FieldValues, object>
    trigger?: Function
    rules?: object
    // disabled?: Boolean
    name?: string
    updateCharLeft?: Function
    [key: string]: unknown
}

export const TextArea = React.forwardRef(
    (
        {
            label,
            className,
            placeholder,
            maxLength,
            initialCharLength,
            errorMsg,
            control,
            // disabled,
            trigger,
            rules,
            name,
            infoText = '',
            ...props
        }: Props,
        ref: MutableRefObject<HTMLTextAreaElement>
    ) => {
        const hasError = errorMsg ? true : false

        const [charLeft, setCharLeft] = useState<number | Boolean>(
            maxLength ? maxLength - (initialCharLength || 0) : false
        )

        const updateCharLeft = (e: React.BaseSyntheticEvent) => {
            if (maxLength || maxLength === 0) {
                const value = e.target.value

                setCharLeft(maxLength - value.length)
            }
        }

        if (control) {
            // Bæti við þessu til að getað gert validate onblur
            return (
                <Controller
                    render={({ field: { onChange, value, ref } }) => {
                        return (
                            <div className={c(s.textarea_container)}>
                                {label && (
                                    <Label tooltip={infoText}>{label}</Label>
                                )}
                                <textarea
                                    {...props}
                                    placeholder={placeholder}
                                    className={c(
                                        s.area,
                                        hasError && s.inputError,
                                        className
                                    )}
                                    onChange={(e) => {
                                        {
                                            updateCharLeft(e)
                                            onChange(e)
                                        }
                                    }}
                                    onBlur={() => trigger(name)}
                                    value={value}
                                    ref={ref}
                                    maxLength={maxLength}
                                ></textarea>

                                {errorMsg ? (
                                    <Text
                                        variant="p-small"
                                        className={s.error_msg}
                                    >
                                        {(charLeft || charLeft === 0) &&
                                            `Stafir eftir: ${charLeft}`}
                                        {maxLength && hasError && ` - `}
                                        {errorMsg}
                                    </Text>
                                ) : (
                                    <Text
                                        className={s.info_msg}
                                        variant="p-small"
                                    >
                                        {(charLeft || charLeft === 0) &&
                                            `Stafir eftir: ${charLeft}`}
                                    </Text>
                                )}
                            </div>
                        )
                    }}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )
        }

        return (
            <div className={c(s.textarea_container)}>
                <Label tooltip={infoText}>{label}</Label>
                <textarea
                    placeholder={placeholder}
                    className={c(s.area, hasError && s.inputError, className)}
                    ref={ref}
                    {...props}
                ></textarea>
                {errorMsg ? (
                    <Text variant="p-small" className={s.error_msg}>
                        {(charLeft || charLeft === 0) &&
                            `Stafir eftir: ${charLeft}`}
                        {maxLength && hasError && ` - `}
                        {errorMsg}
                    </Text>
                ) : (
                    <Text className={s.info_msg} variant="p-small">
                        {(charLeft || charLeft === 0) &&
                            `Stafir eftir: ${charLeft}`}
                    </Text>
                )}
            </div>
        )
    }
)
TextArea.displayName = 'TextArea'
TextArea.defaultProps = {}
