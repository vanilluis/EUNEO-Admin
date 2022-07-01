// React&NextJS
import React from 'react'
// 3rd party libraries
import { Control, Controller, FieldValues } from 'react-hook-form'
import InputMask from 'react-input-mask'
// Services&Helper functions
import memoryFormHelperFunctions from '../../../utils/memoryFormHelperFunctions'
// Types
import { MemFormData } from '../../../types/formTypes'
// Styles
import s from './Input.module.scss'
import c from 'classnames'
// Components
import { Text } from '../text/Text'
import { Label } from '../label/Label'

type Props = {
    control: Control<FieldValues & MemFormData, object>
    name: string
    updateDate: Function
    lifeTimeChange: Function
    trigger: Function
    label?: string
    errorMsg?: string
    charLeft?: Number
    [key: string]: unknown
}

const validateDate = (d: string, validation: string) => {
    const validated = memoryFormHelperFunctions.validateDate(d, validation)
    return validated
}

export const MaskedInput = ({
    name,
    control,
    updateDate,
    lifeTimeChange,
    errorMsg,
    charLeft,
    label,
    trigger,
}: Props) => {
    const nameToChange = name.includes('funeralDate')
        ? null
        : name === 'deathDate'
        ? 'birthDate'
        : 'deathDate'
    const requiredMessage = name.includes('funeralDate')
        ? 'Útfarardag vantar'
        : name === 'deathDate'
        ? 'Dánardag vantar'
        : 'Fæðingardag vantar'

    const dateError = () => {
        return 'Dagsetning ekki til'
    }
    const hasError = errorMsg ? true : false

    if (name.includes('funeral')) {
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
                        updateDate: (d) => updateDate(d) || dateError(),
                        inFuture: (d) =>
                            !validateDate(d, 'inFuture') ||
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
                            mask="99.99.9999"
                            placeholder="dd.mm.áááá"
                            // @ts-ignore:next-line
                            maskChar=""
                            value={value}
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
                        'Dagur verður að vera milli 1-31',
                    validMonth: (d) =>
                        validateDate(d, 'month') ||
                        'Mánuður verður að vera á milli 1-12',
                    validYear: (d) =>
                        validateDate(d, 'year') || 'Ár getur minnst verið 1000',
                    updateDate: (d) => updateDate(d) || dateError(),
                    changeLifetime: (d) =>
                        lifeTimeChange(d, name, nameToChange),
                    notInFuture: (d) =>
                        validateDate(d, 'inFuture') ||
                        'Dagsetning getur ekki verið fram í tímann',
                },
            }}
        />
    )
}
