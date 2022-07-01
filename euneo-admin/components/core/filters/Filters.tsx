// React&NextJS
import React from 'react'
// Styles
import s from './Filters.module.scss'
import classnames from 'classnames'

const c = classnames.bind(s)

type Props = {
    filterNames: Array<string>
    setState?: Function
    selectedIndex?: Number
    [key: string]: unknown
    // typeFilter used in :/services to filter by service types
    typeFilter?: Function
}

export const Filters = ({
    setState,
    filterNames,
    selectedIndex,
    typeFilter,
    ...props
}: Props) => {
    const handleOnClick = (name: string, i: number) => {
        // typefilter is only used in :/services

        if (typeFilter) {
            // Deselect filter field if selected again
            // -1: no field selected in filters
            if (i === selectedIndex) {
                typeFilter(name, -1)
            } else {
                typeFilter(name, i)
            }
        } else {
            if (i === selectedIndex) {
                setState(-1)
            } else {
                setState(i)
            }
        }
    }
    return (
        <div {...props}>
            {filterNames.map((name, i) => {
                return (
                    <button
                        key={name}
                        onClick={() => setState && handleOnClick(name, i)}
                        className={c(
                            s.filter,
                            i === selectedIndex && s.selected
                        )}
                    >
                        {name}
                    </button>
                )
            })}
        </div>
    )
}

Filters.defaultProps = {
    variant: 'ghost',
    onClick: undefined,
}
