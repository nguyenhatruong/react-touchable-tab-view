import React, { useMemo, useState, forwardRef, useImperativeHandle, useCallback } from 'react'

export const TouchableTabview = forwardRef(
  ({ initialTab = 0, children, renderTabBar, tabBarPosition = 'top' }, ref) => {
    const [currentTab, setCurrentTab] = useState(() => Math.max(isNaN(initialTab) ? 0 : initialTab, 0))
    const [visitedTabs, setVisitedTabs] = useState({ [currentTab]: true })

    const childrenArray = useMemo(() => React.Children.toArray(children).filter(Boolean), [children])

    const tabs = useMemo(() =>
      childrenArray.map((child) => ({
        label: child?.props?.tabLabel || '',
        icon: child?.props?.tabIcon || '',
      })), [childrenArray]
    )

    const safeCurrentTab = currentTab >= childrenArray.length ? Math.max(childrenArray.length - 1, 0) : currentTab

    const onChangeTab = useCallback((index) => {
      setCurrentTab(index)
      setVisitedTabs((prev) => (prev[index] ? prev : { ...prev, [index]: true }))
    }, [])

    useImperativeHandle(ref, () => ({
      onChangeTab,
      currentTab: safeCurrentTab,
    }), [onChangeTab, safeCurrentTab])

    const scenes = useMemo(() =>
      childrenArray.map((child, idx) => {
        const isActive = idx === safeCurrentTab
        const isVisited = visitedTabs[idx] || isActive

        if (!isVisited) {
          return <div key={idx} />
        }

        const { className, ...otherProps } = child.props

        return (
          <div
            key={idx}
            className={className}
            style={!isActive ? { display: 'none' } : {}}
          >
            {React.cloneElement(child, otherProps)}
          </div>
        )
      }), [childrenArray, safeCurrentTab, visitedTabs]
    )

    const tabBar = typeof renderTabBar === 'function' ? renderTabBar({
      tabs,
      currentTab: safeCurrentTab,
      onChangeTab,
    }) : null

    return (
      <>
        {tabBarPosition === 'top' && tabBar}
        {scenes}
        {tabBarPosition === 'bottom' && tabBar}
      </>
    )
  }
)

TouchableTabview.displayName = 'TouchableTabview'
