/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app to children via <UIProvider />
 * states include overflow state; navOpen (mobile only by default); page transition opt in / out;
 */

// React&NextJS
import React, { createContext, useState, useEffect, useCallback } from 'react'

type IUIState = {
    isLoading?: boolean
    isNavOpen?: boolean
    canTransition?: boolean
    canScroll?: boolean
    readonly prefersReducedMotion?: boolean
}

type IContext = {
    uiState: IUIState
    setUIState: (args: IUIState) => void
}

// export UIContext. usage: React.useContext(UIContext);
export const UIContext = createContext<IContext>({
    uiState: {
        isLoading: false,
        isNavOpen: false,
        canScroll: true,
        canTransition: false,
        prefersReducedMotion: false,
    },

    setUIState: () => null,
})

// exported UIProvider Component
// wraps _app for children to optionally consume with useContext() hook
export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    // setup initial values, updated from DOM on mount
    const [prefersReducedMotion] = useState(false)

    const [uiState, updateUiState] = useState<IUIState>({
        // writable values
        isLoading: false,
        isNavOpen: false,
        canScroll: true,
        canTransition: false,
        // readonly
        prefersReducedMotion,
    })

    // alias to update uiState
    // stops having to pass previous state back in every time
    const setUIState = useCallback((state: IUIState) => {
        updateUiState((prevState) => ({
            ...prevState,
            ...state,
        }))
    }, [])

    // check user OS preferences for animation & scrollbar width on mount
    useEffect(() => {
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        )
        setUIState({ prefersReducedMotion: reducedMotion.matches })
    }, [setUIState])

    // function for setting overflow on html element (ie navigation open, modal open etc)
    // classnames are in global.scss
    const preventScroll = useCallback(
        (prevent: boolean, isNavOpen?: boolean) => {
            // nav open distinction is so overflow is only in "mobile"
            const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled'
            document.documentElement.classList[prevent ? 'add' : 'remove'](
                htmlClassName
            )
        },
        []
    )

    // on "canScroll" change, toggle preventScroll()
    useEffect(() => {
        preventScroll(!uiState.canScroll)
    }, [uiState.canScroll, preventScroll])

    // toggle nav states
    useEffect(() => {
        preventScroll(uiState.isNavOpen ?? false, true)
    }, [uiState.isNavOpen, preventScroll])

    return (
        <UIContext.Provider
            value={{
                uiState,
                setUIState,
            }}
        >
            {children}
        </UIContext.Provider>
    )
}
