// React&NextJS
import React, { useState } from 'react'
// Styles
import s from './Input.module.scss'
import c from 'classnames'
// Components
import { Icon } from '../icon/Icon'
import { Label } from '../label/Label'
import { Text } from '../text/Text'
import { Control, Controller, FieldValues } from 'react-hook-form'

type Props = {
    id: string
    name: string
    label?: string
    fileText?: string
    className?: string
    tooltip?: string
    errorMsg?: string
    initialCharLength?: number
    noError?: Boolean
    maxLength?: number
    setValue?: Function
    trigger?: Function
    onChange?: any
    rules?: object
    control: Control<FieldValues, object>

    [key: string]: unknown
}

export const Input = React.forwardRef(
    (
        {
            name,
            label,
            fileText,
            className,
            tooltip,
            initialCharLength,
            errorMsg,
            noError,
            maxLength,
            setValue,
            control,
            rules,
            trigger,
            ...props
        }: Props,
        ref: any
    ) => {
        let hasError = errorMsg ? true : false
        const nameMaxLength = name === 'fullName' ? 60 : null

        const [charLeft, setCharLeft] = useState<number | Boolean>(
            maxLength ? maxLength - (initialCharLength || 0) : false
        )

        const updateCharLeft = (e: React.BaseSyntheticEvent) => {
            if (maxLength || maxLength === 0) {
                const value = e.target.value
                setCharLeft(maxLength - value.length)
            }
        }

        const textInFileBtn = () => {
            if (fileText) return fileText
            else if (props.multiple) return 'Sækja myndir'
            else return 'Sækja mynd'
        }

        if (props.type === 'file') {
            return (
                <>
                    {label && (
                        <Label tooltip={tooltip} file>
                            {label}
                        </Label>
                    )}
                    <input className={s.input} ref={ref} {...props}></input>
                    <label className={s.upload} htmlFor={props.id}>
                        {/* <Icon variant="upload" /> */}
                        <span>{textInFileBtn()}</span>
                    </label>
                </>
            )
        } else if (props.type === 'radio') {
            return (
                <label className={c(s.container, className)}>
                    <Text>{label}</Text>
                    <input name={name} ref={ref} {...props} />
                    <span className={s.radio}></span>
                </label>
            )
        } else if (props.type === 'checkbox') {
            return (
                <label className={c(s.container, className)}>
                    <Text>{label}</Text>
                    <input ref={ref} name={name} {...props} />
                    <span className={s.checkmark}>
                        <Icon className={s.checkSvg} variant="checkmark" />
                    </span>
                </label>
            )
        } else if (control) {
            // Bæti við þessu til að getað gert validate onblur
            return (
                <Controller
                    render={({ field: { onChange, value, ref } }) => {
                        return (
                            <div className={c(s.input_container)}>
                                <Label tooltip={tooltip}>{label}</Label>
                                <input
                                    {...props}
                                    className={c(
                                        s.input,
                                        hasError && s.inputError
                                    )}
                                    onChange={(e) => {
                                        {
                                            maxLength && updateCharLeft(e)
                                            onChange(e)
                                        }
                                    }}
                                    onBlur={() => trigger(name)}
                                    value={value}
                                    ref={ref}
                                    maxLength={maxLength || nameMaxLength}
                                ></input>

                                {!noError &&
                                    (errorMsg ? (
                                        <Text
                                            variant="p-small"
                                            className={s.error_msg}
                                        >
                                            {maxLength &&
                                                `Stafir eftir: ${charLeft}`}
                                            {maxLength && hasError && ` - `}
                                            {errorMsg}
                                        </Text>
                                    ) : (
                                        <Text
                                            className={s.info_msg}
                                            variant="p-small"
                                        >
                                            {maxLength &&
                                                `Stafir eftir: ${charLeft}`}
                                        </Text>
                                    ))}
                            </div>
                        )
                    }}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )
        } else {
            return (
                <div className={c(s.input_container, !hasError && s.hasError)}>
                    {label && <Label tooltip={tooltip}>{label}</Label>}
                    <input
                        {...props}
                        className={c(s.input, hasError && s.inputError)}
                        onChange={(e: React.BaseSyntheticEvent) => {
                            if (setValue) {
                                setValue(name, e.target.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                })
                                updateCharLeft(e)
                            } else {
                                props.onChange(e)
                            }
                        }}
                        ref={ref}
                        maxLength={maxLength}
                    ></input>

                    {!noError &&
                        (errorMsg ? (
                            <Text variant="p-small" className={s.error_msg}>
                                {maxLength && `Stafir eftir: ${charLeft}`}
                                {maxLength && hasError && ` - `}
                                {errorMsg}
                            </Text>
                        ) : (
                            <Text className={s.info_msg} variant="p-small">
                                {maxLength && `Stafir eftir: ${charLeft}`}
                            </Text>
                        ))}
                </div>
            )
        }
    }
)
Input.displayName = 'Input'
Input.defaultProps = {}
