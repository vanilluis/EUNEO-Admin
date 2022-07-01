// React&NextJS
import React, { useEffect, useState } from 'react'
// 3rd party libraries
import Selector from 'react-select'
// Styles
import s from './Select.module.scss'
import c from 'classnames'

type SelectProps = {
    label?: string
    year?: Boolean
    onChange: Function
    className: string
    options: Array<{}>
    innerRef?: any
    [key: string]: unknown
}

type OptionProps = {
    children: React.ReactNode
    getStyles: Function
    isFocused: boolean
    isSelected: boolean
    isDisabled?: boolean
    innerRef: React.LegacyRef<HTMLDivElement>
    innerProps: any
    className?: string
}

const Option = (props: OptionProps) => {
    const {
        children,
        // className,
        getStyles,
        // isDisabled, // fínt að geyma þetta þar sem að við gætum notað þetta seinna
        isFocused,
        isSelected,
        innerRef,
        innerProps,
    } = props
    {
        return (
            <div
                ref={innerRef}
                css={getStyles('option', props)}
                className={c(
                    s.option,
                    isFocused && s['option__is_focused'],
                    isSelected && s['option__is_selected']
                )}
                {...innerProps}
            >
                {children}
            </div>
        )
    }
}

function Select({
    // label,
    year = false,
    onChange,
    className,
    options,
    filter,
    ...props
}: SelectProps) {
    const [, setDevice] = useState(true)
    const customOptions = [
        {
            value: 'custom',
            label: 'Ekkert',
        },
        ...options,
    ]

    useEffect(() => {
        if (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.innerWidth <= 800
        ) {
            setDevice(false)
        }
    }, [])

    return (
        <Selector
            components={{ Option }}
            options={customOptions}
            placeholder="Fæðingarár"
            className={c(s.select, year && s.year, className)}
            isSearchable={false}
            defaultValue={filter ? { label: filter, value: filter } : ''}
            onChange={onChange}
            {...props}
        />
    )
}

export default Select
