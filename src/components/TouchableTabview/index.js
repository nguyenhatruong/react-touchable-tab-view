import React, { useEffect, useState, Fragment } from 'react'

export const TouchableTabview = ({ initialTab, children, renderTabBar }) => {
  const [state, setState] = useState({
    sceneKeys: {},
    currentTab: initialTab || 0,
    tabs: []
  })

  const { sceneKeys, currentTab, tabs } = state

  const compact = (data = []) => data.filter(item => !!item)

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
      setState({
        ...state,
        tabs: initialTabs,
        currentTab: nextCurrentTab,
        sceneKeys: newSceneKeys({ previousKeys: sceneKeys, tabIndex: nextCurrentTab }),
      })
    }
  }, [children])

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
    setState({ ...state, currentTab: tabIndex, sceneKeys: newKeys })
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
      {renderTab()}
      {composeScenes()}
    </>
  )
}

TouchableTabview.defaultProps = {
  initialTab: 0
}