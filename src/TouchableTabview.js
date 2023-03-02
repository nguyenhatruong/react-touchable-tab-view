import React, { useEffect, useState, Fragment, forwardRef, useImperativeHandle } from 'react'

export const TouchableTabview = forwardRef(({ initialTab, children, renderTabBar, tabBarPosition }, ref) => {
  const [state, setState] = useState({
    sceneKeys: {},
    currentTab: initialTab || 0,
    tabs: []
  })

  const { sceneKeys, currentTab, tabs } = state

  useImperativeHandle(ref, () => ({
    onChangeTab,
    currentTab
  }), [currentTab])

  useEffect(() => {
    if (children && compact(children).length !== tabs.length) {
      const initialTabs = []
      getChildren().map(child => {
        initialTabs.push({
          label: child.props.tabLabel,
          icon: child.props.tabIcon || ''
        })
      })
      const nextCurrentTab = currentTab >= initialTabs.length ? initialTabs.length - 1 : currentTab
      setState(prevState => ({
        ...prevState,
        tabs: initialTabs,
        currentTab: nextCurrentTab,
        sceneKeys: newSceneKeys({ previousKeys: sceneKeys, tabIndex: nextCurrentTab }),
      }))
    }
  }, [children])

  const compact = (items = []) => items.filter(item => !!item)

  const newSceneKeys = ({ previousKeys = {}, tabIndex = currentTab }) => {
    const newKeys = {}
    getChildren().forEach((child, idx) => {
      const key = makeSceneKey(child, idx)
      if (keyExists(previousKeys, key) || idx === tabIndex) {
        newKeys[key] = true
      }
    })
    return newKeys
  }

  const getChildren = () => React.Children.map(children, child => child)

  const makeSceneKey = (child, idx) => `${child.props.tabLabel}_${idx}`

  const keyExists = (sceneKey, key) => sceneKey[key] === true

  const composeScenes = () => getChildren().map((child, idx) => {
    const key = makeSceneKey(child, idx)
    const isActive = idx === currentTab
    const { className, tabLabel, tabIcon, ...otherProps } = child.props
    const childClone = {
      ...child,
      props: { ...otherProps }
    }
    return (
      <Fragment key={child.key}>
        {keyExists(sceneKeys, key) ? (
          <div hidden={!isActive} className={className && [className]}>
            {childClone}
          </div>
        ) : (
          <div label={tabLabel} icon={tabIcon || ''} />
        )}
      </Fragment>
    )
  })

  const onChangeTab = (tabIndex) => {
    const newKeys = newSceneKeys({ previousKeys: sceneKeys, tabIndex })
    setState(prevState => ({ ...prevState, currentTab: tabIndex, sceneKeys: newKeys }))
  }

  const renderTab = () => {
    if (typeof renderTabBar === 'function') {
      return renderTabBar({
        tabs,
        currentTab,
        onChangeTab
      })
    }
  }

  return (
    <>
      {tabBarPosition === 'top' && renderTab()}
      {composeScenes()}
      {tabBarPosition === 'bottom' && renderTab()}
    </>
  )
})

TouchableTabview.defaultProps = {
  initialTab: 0,
  tabBarPosition: 'top'
}