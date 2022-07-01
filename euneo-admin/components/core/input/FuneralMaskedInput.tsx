// React&NextJS
import React from 'react'
// 3rd party libraries
import {
    Control,
    Controller,
    DeepMap,
    FieldError,
    FieldValues,
    UseFormClearErrors,
    UseFormSetError,
} from 'react-hook-form'
import InputMask from 'react-input-mask'
// Services&Helper functions
import memoryFormHelperFunctions from '../../../utils/memoryFormHelperFunctions'
// Types
import { MemFormData, FuneralForm } from '../../../types/formTypes'
// Styles
import s from './Input.module.scss'
import c from 'classnames'
// Components
import { Text } from '../text/Text'
import { Label } from '../label/Label'

type Props = {
    control: Control<FieldValues & MemFormData, object>
    name: string
    updateDate?: Function
    trigger: Function
    label?: string
    errors?: DeepMap<MemFormData, FieldError>
    errorMsg?: string
    setError?: UseFormSetError<MemFormData>
    clearErrors?: UseFormClearErrors<MemFormData>
    charLeft?: Number
    funeralData?: FuneralForm
    [key: string]: unknown
}

export const FuneralMaskedInput = ({
    name,
    control,
    updateDate,
    errors,
    setError,
    clearErrors,
    errorMsg,
    charLeft,
    label,
    trigger,
    funeralData,
}: Props) => {
    const requiredMessage = name.includes('funeralDate')
        ? 'Útfarardag vantar'
        : 'Tíma útfarar vantar'

    const hasError = errorMsg ? true : false

    const validateDate = (d: string, validation: string) => {
        let validated = true
        const time = funeralData?.funeralTime || '99:99'
        if (validation === 'funeral' && validateTime(time)) {
            const timeList = time.split(':')
            const hoursMS = parseInt(timeList[0]) * 3600000
            const minutesMS = parseInt(timeList[1]) * 60000
            const timeMS = hoursMS + minutesMS
            validated = memoryFormHelperFunctions.validateDate(
                d,
                validation,
                timeMS
            )
            !validated &&
                setError('announcements.funeral.funeralTime', {
                    type: 'inFuture',
                    message: ' ',
                })
            validated &&
                errors?.announcements?.funeral?.funeralTime?.type ===
                    'inFuture' &&
                clearErrors('announcements.funeral.funeralTime')
        } else {
            validated = memoryFormHelperFunctions.validateDate(d, validation)
        }
        return validated
    }

    const validateTime = (t: string, needTrigger: Boolean = false) => {
        const validated = memoryFormHelperFunctions.validateTime(t)
        // const funeralError = errors?.announcements?.funeral?.funeralDate?.type
        //     ? true
        //     : false
        // console.log(!funeralError)

        needTrigger &&
            // !funeralError &&
            trigger('announcements.funeral.funeralDate')
        return validated
    }

    if (name.includes('funeralDate')) {
        return (
            <Controller
                render={({ field: { onChange, value, ref } }) => {
                    return (
                        <div className={c(s.input_container)}>
                            <Label>{label}</Label>
                            <InputMask
                                mask="99.99.9999"
                                placeholder="dd.mm.áááá"
                                // @ts-ignore:next-line
                                maskChar=""
                                value={value || ''}
                                onChange={onChange}
                                onBlur={() => trigger(name)}
                                className={c(hasError && s.inputError)}
                                type="text"
                                ref={ref} // wire up the input ref
                            />
                            {errorMsg ? (
                                <Text variant="p-small" className={s.error_msg}>
                                    {charLeft && `Stafir eftir: ${charLeft}`}
                                    {charLeft && hasError && ` - `}
                                    {errorMsg}
                                </Text>
                            ) : (
                                <Text className={s.info_msg} variant="p-small">
                                    {charLeft && `Stafir eftir: ${charLeft}`}
                                </Text>
                            )}
                        </div>
                    )
                }}
                name={name}
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: requiredMessage,
                    },
                    validate: {
                        validDay: (d) =>
                            validateDate(d, 'day') ||
                            'DD verður að vera milli 1-31',
                        validMonth: (d) =>
                            validateDate(d, 'month') ||
                            'MM verður að vera á milli 1-12',
                        validYear: (d) =>
                            validateDate(d, 'year') ||
                            'YYYY getur minnst verið 1000',
                        updateDate: (d) =>
                            updateDate(d) || 'Dagsetning ekki til',
                        inFuture: (d) =>
                            validateDate(d, 'funeral') ||
                            'Dagsetning þarf að vera fram í tímann',
                    },
                }}
            />
        )
    }
    return (
        <Controller
            render={({ field: { onChange, value, ref } }) => {
                return (
                    <div className={c(s.input_container)}>
                        <Label>{label}</Label>
                        <InputMask
                            mask="99:99"
                            placeholder="kk:mm"
                            // @ts-ignore:next-line
                            maskChar=""
                            value={value || ''}
                            onChange={onChange}
                            onBlur={() => trigger(name)}
                            className={c(hasError && s.inputError)}
                            type="text"
                            ref={ref} // wire up the input ref
                        />
                        {errorMsg ? (
                            <Text variant="p-small" className={s.error_msg}>
                                {charLeft && `Stafir eftir: ${charLeft}`}
                                {charLeft && hasError && ` - `}
                                {errorMsg}
                            </Text>
                        ) : (
                            <Text className={s.info_msg} variant="p-small">
                                {charLeft && `Stafir eftir: ${charLeft}`}
                            </Text>
                        )}
                    </div>
                )
            }}
            name={name}
            control={control}
            rules={{
                required: {
                    value: true,
                    message: requiredMessage,
                },
                validate: {
                    validTime: (t) =>
                        validateTime(t, true) || 'Tímasetning ekki til',
                },
            }}
        />
    )
}
