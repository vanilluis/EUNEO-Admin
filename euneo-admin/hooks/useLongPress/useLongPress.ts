// React&NextJS
import React, { MutableRefObject, useCallback, useMemo, useRef } from 'react'

export function useLongPress(
    onLongPress: Function,
    onClick: Function,
    { ms = 150 } = {}
) {
    // eslint-disable-next-line no-undef
    const timerRef: MutableRefObject<NodeJS.Timeout> = useRef(null)
    const eventRef = useRef({})

    const callback = useCallback(() => {
        onLongPress(eventRef.current)
        eventRef.current = {}
        timerRef.current = null
    }, [onLongPress])

    const start = useCallback(
        (ev: React.MouseEvent) => {
            ev.persist()
            eventRef.current = ev
            timerRef.current = setTimeout(callback, ms)
        },
        [callback, ms]
    )

    const stop = useCallback(
        (ev: React.MouseEvent, shouldTriggerClick = true) => {
            ev.persist()
            eventRef.current = ev
            if (timerRef.current && shouldTriggerClick) {
                clearTimeout(timerRef.current)
                onClick(eventRef.current)
                timerRef.current = null
                eventRef.current = {}
            }
        },
        [onClick]
    )

    return useMemo(
        () => ({
            onMouseDown: start,
            onMouseUp: stop,
            // cancel click/select if mouse leaves item while mouse button down.
            onMouseLeave: (ev: React.MouseEvent) => stop(ev, false),
            onTouchStart: start,
            onTouchEnd: stop,
        }),
        [start, stop]
    )
}
